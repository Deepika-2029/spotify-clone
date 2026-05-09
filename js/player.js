const Player = (() => {
  const audio = new Audio();
  audio.crossOrigin = 'anonymous';
  audio.preload = 'none';

  let state = {
    isPlaying: false,
    isShuffle: false,
    repeatMode: 0, // 0=off 1=all 2=one
    isMuted: false,
    volume: 0.8,
    currentTrack: null,
    queue: [],
    queueIndex: 0,
  };

  // ── Helpers ──────────────────────────────────────────
  function fmt(secs) {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = String(Math.floor(secs % 60)).padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateProgressUI() {
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    const fill  = document.getElementById('progressFill');
    const thumb = document.getElementById('progressThumb');
    const cur   = document.getElementById('currentTime');
    const tot   = document.getElementById('totalTime');
    if (fill)  fill.style.width  = pct + '%';
    if (thumb) thumb.style.left  = pct + '%';
    if (cur)   cur.textContent   = fmt(audio.currentTime);
    if (tot)   tot.textContent   = fmt(audio.duration);
  }

  function updatePlayBtn() {
    const icon = document.getElementById('playIcon');
    if (icon) icon.className = state.isPlaying ? 'fas fa-pause' : 'fas fa-play';
  }

  function highlightTrack() {
    document.querySelectorAll('.track-row').forEach((row, i) => {
      const isActive = i === state.queueIndex;
      row.classList.toggle('playing', isActive);
      const numEl = row.querySelector('.track-num');
      if (!numEl) return;
      if (isActive) {
        numEl.innerHTML = '<div class="playing-bars"><span></span><span></span><span></span></div>';
      } else {
        numEl.textContent = i + 1;
      }
    });
  }

  function setNowPlayingUI(track) {
    const art    = document.getElementById('npArt');
    const title  = document.getElementById('npTitle');
    const artist = document.getElementById('npArtist');
    if (art)    art.textContent    = track.emoji || '🎵';
    if (title)  title.textContent  = track.title;
    if (artist) artist.textContent = track.artist;
    document.title = `${track.title} • ${track.artist} - Spotify`;
  }

  function showToast(msg) {
    let t = document.getElementById('sp-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'sp-toast';
      t.style.cssText = `position:fixed;bottom:100px;left:50%;transform:translateX(-50%);
        background:#1DB954;color:#000;padding:10px 20px;border-radius:500px;
        font-size:13px;font-weight:700;z-index:999;opacity:0;transition:opacity .3s;pointer-events:none`;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.style.opacity = '0', 2500);
  }

  // ── Core playback ─────────────────────────────────────
  async function loadTrack(track) {
    state.currentTrack = track;
    setNowPlayingUI(track);

    if (track.freshPreview) {
      audio.src = track.freshPreview;
      audio.load();
      return true;
    }

    // Fetch fresh preview URL from iTunes API
    showToast('🔍 Loading track...');
    try {
      const query = encodeURIComponent(`${track.title} ${track.artist}`);
      const res = await fetch(
        `https://itunes.apple.com/search?term=${query}&media=music&limit=1&entity=song`,
        { mode: 'cors' }
      );
      if (res.ok) {
        const data = await res.json();
        const item = data.results?.[0];
        if (item?.previewUrl) {
          track.freshPreview = item.previewUrl;
          track.artworkUrl = item.artworkUrl100?.replace('100x100', '300x300');
          // update artwork
          const art = document.getElementById('npArt');
          if (art && track.artworkUrl) {
            art.innerHTML = `<img src="${track.artworkUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:4px" onerror="this.parentElement.textContent='${track.emoji||'🎵'}'"/>`;
          }
          audio.src = item.previewUrl;
          audio.load();
          return true;
        }
      }
    } catch(e) {}

    showToast('⚠️ No preview available for this track');
    return false;
  }

  async function play(track, queue, index) {
    if (queue !== undefined) { state.queue = queue; state.queueIndex = index || 0; }
    if (track) {
      const ok = await loadTrack(track);
      if (!ok) return;
    }
    try {
      await audio.play();
      state.isPlaying = true;
      updatePlayBtn();
      highlightTrack();
      showToast(`▶ ${state.currentTrack.title}`);
    } catch(e) {
      showToast('⚠️ Could not play – try another track');
    }
  }

  function pause() {
    audio.pause();
    state.isPlaying = false;
    updatePlayBtn();
  }

  function togglePlay() {
    if (!state.currentTrack) return;
    if (state.isPlaying) pause();
    else play();
  }

  async function next() {
    if (!state.queue.length) return;
    if (state.isShuffle) {
      state.queueIndex = Math.floor(Math.random() * state.queue.length);
    } else {
      state.queueIndex = (state.queueIndex + 1) % state.queue.length;
    }
    await play(state.queue[state.queueIndex], undefined, state.queueIndex);
  }

  async function prev() {
    if (!state.queue.length) return;
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    state.queueIndex = (state.queueIndex - 1 + state.queue.length) % state.queue.length;
    await play(state.queue[state.queueIndex], undefined, state.queueIndex);
  }

  function toggleShuffle() {
    state.isShuffle = !state.isShuffle;
    document.getElementById('shuffleBtn')?.classList.toggle('active', state.isShuffle);
    showToast(state.isShuffle ? '🔀 Shuffle on' : '🔀 Shuffle off');
  }

  function toggleRepeat() {
    state.repeatMode = (state.repeatMode + 1) % 3;
    const btn = document.getElementById('repeatBtn');
    if (!btn) return;
    const labels = ['Repeat off', 'Repeat all', 'Repeat one'];
    showToast('🔁 ' + labels[state.repeatMode]);
    btn.classList.toggle('active', state.repeatMode > 0);
    btn.style.position = 'relative';
    btn.innerHTML = state.repeatMode === 2
      ? '<i class="fas fa-redo"></i><span style="font-size:9px;position:absolute;bottom:0;right:0;background:var(--green);color:#000;border-radius:50%;width:10px;height:10px;display:flex;align-items:center;justify-content:center;line-height:1">1</span>'
      : '<i class="fas fa-redo"></i>';
  }

  function setVolume(v) {
    state.volume = v / 100;
    audio.volume = state.isMuted ? 0 : state.volume;
    updateVolIcon(v);
  }

  function toggleMute() {
    state.isMuted = !state.isMuted;
    audio.volume = state.isMuted ? 0 : state.volume;
    const slider = document.getElementById('volumeSlider');
    if (slider) slider.value = state.isMuted ? 0 : state.volume * 100;
    updateVolIcon(state.isMuted ? 0 : state.volume * 100);
  }

  function updateVolIcon(v) {
    const icon = document.getElementById('volIcon');
    if (!icon) return;
    if (state.isMuted || v == 0) icon.className = 'fas fa-volume-mute';
    else if (v < 40)             icon.className = 'fas fa-volume-down';
    else                         icon.className = 'fas fa-volume-up';
  }

  // ── Audio events ───────────────────────────────────────
  audio.addEventListener('timeupdate', updateProgressUI);
  audio.addEventListener('ended', () => {
    if (state.repeatMode === 2) { audio.currentTime = 0; audio.play(); }
    else next();
  });
  audio.addEventListener('error', () => showToast('⚠️ Preview unavailable'));
  audio.addEventListener('waiting', () => showToast('⏳ Loading...'));
  audio.addEventListener('playing', () => {
    state.isPlaying = true;
    updatePlayBtn();
  });
  audio.addEventListener('pause', () => {
    state.isPlaying = false;
    updatePlayBtn();
  });

  // ── Init DOM bindings ─────────────────────────────────
  function init() {
    audio.volume = state.volume;

    document.getElementById('playPauseBtn')?.addEventListener('click', togglePlay);
    document.getElementById('nextBtn')?.addEventListener('click', next);
    document.getElementById('prevBtn')?.addEventListener('click', prev);
    document.getElementById('shuffleBtn')?.addEventListener('click', toggleShuffle);
    document.getElementById('repeatBtn')?.addEventListener('click', toggleRepeat);
    document.getElementById('muteBtn')?.addEventListener('click', toggleMute);
    document.getElementById('volumeSlider')?.addEventListener('input', e => setVolume(Number(e.target.value)));

    const wrap = document.getElementById('progressBarWrap');
    wrap?.addEventListener('click', e => {
      const rect = wrap.getBoundingClientRect();
      const pct  = (e.clientX - rect.left) / rect.width;
      if (audio.duration) audio.currentTime = pct * audio.duration;
    });

    document.getElementById('likeBtn')?.addEventListener('click', function () {
      this.classList.toggle('liked');
      const i = this.querySelector('i');
      if (i) i.className = this.classList.contains('liked') ? 'fas fa-heart' : 'far fa-heart';
      showToast(this.classList.contains('liked') ? '💚 Added to Liked Songs' : 'Removed from Liked Songs');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space')                       { e.preventDefault(); togglePlay(); }
      if (e.code === 'ArrowRight' && e.altKey)       next();
      if (e.code === 'ArrowLeft'  && e.altKey)       prev();
      if (e.code === 'KeyM')                         toggleMute();
    });
  }

  return { init, play, pause, togglePlay, next, prev, state, showToast };
})();
