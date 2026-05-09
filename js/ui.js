const UI = (() => {

  const COLORS = ['#e91429','#1e3264','#8400e7','#ba5d07','#0d73ec','#148a08',
                  '#e8115b','#6400f4','#1e3264','#27856a','#9cf0e1','#f59b23'];

  function resolveColor(color) {
    if (typeof color === 'number') return COLORS[color % COLORS.length];
    if (typeof color === 'string') return color;
    return '#535353';
  }

  function bgStyle(color) {
    const c = resolveColor(color);
    return c.startsWith('linear') ? `background:${c}` : `background:${c}`;
  }

  // ── Card ──────────────────────────────────────────────
  function makeCard(item, onClick) {
    const div = document.createElement('div');
    div.className = 'card';
    const artClass = item.circle ? 'card-art circle' : 'card-art';
    div.innerHTML = `
      <div class="${artClass}" style="${bgStyle(item.color)}">${item.emoji || '🎵'}</div>
      <div class="card-title">${item.title || item.name}</div>
      <div class="card-sub">${item.sub || item.meta || ''}</div>
      <button class="card-play" aria-label="Play"><i class="fas fa-play"></i></button>
    `;
    div.addEventListener('click', () => onClick?.(item));
    div.querySelector('.card-play').addEventListener('click', e => { e.stopPropagation(); onClick?.(item); });
    return div;
  }

  function renderCards(id, items, onClick) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = '';
    items.forEach(item => el.appendChild(makeCard(item, onClick)));
  }

  // ── Quick picks ───────────────────────────────────────
  function renderQuickPicks(items, onClick) {
    const el = document.getElementById('quickPicks');
    if (!el) return;
    el.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'quick-item';
      div.innerHTML = `
        <div class="qi-art" style="${bgStyle(item.color)}">${item.emoji}</div>
        <span class="qi-name">${item.name}</span>
        <button class="qi-play" aria-label="Play ${item.name}"><i class="fas fa-play"></i></button>
      `;
      div.addEventListener('click', () => onClick?.(item));
      el.appendChild(div);
    });
  }

  // ── Genres ────────────────────────────────────────────
  function renderGenres(items) {
    const el = document.getElementById('genreGrid');
    if (!el) return;
    el.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'genre-card';
      div.style.background = item.bg;
      div.innerHTML = `<span>${item.name}</span><span class="genre-emoji">${item.emoji}</span>`;
      el.appendChild(div);
    });
  }

  // ── Library ───────────────────────────────────────────
  function renderLibrary(items, onClick) {
    const el = document.getElementById('libraryList');
    if (!el) return;
    el.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'library-item';
      const artClass = item.circle ? 'lib-art circle' : 'lib-art';
      div.innerHTML = `
        <div class="${artClass}" style="${bgStyle(item.color)}">${item.emoji}</div>
        <div class="lib-info">
          <div class="lib-name">${item.name}</div>
          <div class="lib-meta">${item.meta}</div>
        </div>
      `;
      div.addEventListener('click', () => onClick?.(item));
      el.appendChild(div);
    });
  }

  // ── Playlist page ─────────────────────────────────────
  function renderPlaylistPage(item, tracks) {
    const bgColor = resolveColor(item.color);

    const header = document.getElementById('playlistHeader');
    if (header) {
      header.style.background = `linear-gradient(to bottom, ${bgColor.startsWith('linear') ? '#535353' : bgColor}99, #121212)`;
      header.innerHTML = `
        <div class="pl-art" style="${bgStyle(item.color)}">${item.emoji || '🎵'}</div>
        <div class="pl-info">
          <div class="pl-type">Playlist</div>
          <div class="pl-name">${item.title || item.name}</div>
          <div class="pl-meta">${tracks.length} songs • 30-sec previews</div>
        </div>
      `;
    }

    const tl = document.getElementById('trackList');
    if (!tl) return;
    tl.innerHTML = `
      <div class="pl-actions">
        <button class="pl-play-btn" id="plPlayBtn"><i class="fas fa-play"></i></button>
        <button class="pl-icon-btn"><i class="fas fa-heart" style="color:var(--green)"></i></button>
        <button class="pl-icon-btn"><i class="fas fa-ellipsis-h"></i></button>
        <span style="margin-left:auto;font-size:12px;color:var(--text-secondary)">30-sec iTunes previews</span>
      </div>
      <div class="track-list-header">
        <span>#</span><span>Title</span><span>Album</span><span><i class="fas fa-clock"></i></span>
      </div>
      <div id="trackRows"></div>
    `;

    const rows = document.getElementById('trackRows');
    tracks.forEach((track, i) => {
      const row = document.createElement('div');
      row.className = 'track-row';
      row.dataset.index = i;
      row.innerHTML = `
        <span class="track-num">${i + 1}</span>
        <div class="track-info">
          <div class="track-thumb" style="background:#282828">${track.emoji || '🎵'}</div>
          <div class="track-title-col">
            <div class="t-name">${track.title}</div>
            <div class="t-artist">${track.artist}</div>
          </div>
        </div>
        <span class="track-album">${track.album || ''}</span>
        <span class="track-duration">${track.duration || '0:30'}</span>
      `;
      row.addEventListener('click', () => Player.play(track, tracks, i));
      rows.appendChild(row);
    });

    document.getElementById('plPlayBtn')?.addEventListener('click', () => {
      Player.play(tracks[0], tracks, 0);
    });
  }

  // ── Navigation ────────────────────────────────────────
  function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId)?.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => {
      n.classList.toggle('active', n.dataset.page === pageId);
    });
  }

  function showPlaylistPage(item, tracks) {
    renderPlaylistPage(item, tracks);
    navigateTo('playlist');
  }

  function setGreeting() {
    const h = new Date().getHours();
    const el = document.getElementById('greetingText');
    if (!el) return;
    if (h < 12)      el.textContent = 'Good morning';
    else if (h < 17) el.textContent = 'Good afternoon';
    else             el.textContent = 'Good evening';
  }

  return { renderCards, renderQuickPicks, renderGenres, renderLibrary, setGreeting, navigateTo, showPlaylistPage };
})();
