document.addEventListener('DOMContentLoaded', () => {

  Player.init();
  UI.setGreeting();

  function getTracks(key) {
    return DATA.tracks[key] || DATA.tracks.default;
  }

  function onCardClick(item) {
    UI.showPlaylistPage(item, getTracks(item.tracks || 'default'));
  }

  // ── Render all sections ───────────────────────────────
  UI.renderQuickPicks(DATA.quickPicks, item =>
    UI.showPlaylistPage(item, getTracks(item.tracks || 'default'))
  );
  UI.renderCards('featuredCharts',  DATA.featuredCharts,  onCardClick);
  UI.renderCards('madeForYou',      DATA.madeForYou,      onCardClick);
  UI.renderCards('recentlyPlayed',  DATA.recentlyPlayed,  onCardClick);
  UI.renderCards('trendingNow',     DATA.trendingNow,     onCardClick);
  UI.renderGenres(DATA.genres);
  UI.renderLibrary(DATA.library, item =>
    UI.showPlaylistPage(item, getTracks(item.tracks || 'default'))
  );

  // ── Navigation ────────────────────────────────────────
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      UI.navigateTo(el.dataset.page);
    });
  });

  document.getElementById('backBtn')?.addEventListener('click', () => history.back());
  document.getElementById('forwardBtn')?.addEventListener('click', () => history.forward());

  // ── Live Search (iTunes API) ───────────────────────────
  const searchInput = document.getElementById('searchInput');
  let searchTimer = null;

  async function doSearch(q) {
    const genreGrid = document.getElementById('genreGrid');
    const searchH2  = document.querySelector('#page-search .search-results h2');
    UI.navigateTo('search');

    if (!q) {
      if (searchH2) searchH2.textContent = 'Browse all categories';
      UI.renderGenres(DATA.genres);
      return;
    }

    if (searchH2) searchH2.innerHTML = `<span>Searching for "<em>${q}</em>"...</span>`;
    if (genreGrid) genreGrid.innerHTML = '<div style="color:var(--text-secondary);font-size:13px;padding:20px 0">Searching iTunes...</div>';

    // First search local data
    const local = [];
    Object.values(DATA.tracks).forEach(list => {
      list.forEach(t => {
        const match = t.title.toLowerCase().includes(q.toLowerCase()) || t.artist.toLowerCase().includes(q.toLowerCase());
        if (match && !local.find(r => r.title === t.title)) local.push(t);
      });
    });

    // Then fetch from iTunes
    let results = [...local];
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=12&entity=song`,
        { mode: 'cors' }
      );
      if (res.ok) {
        const data = await res.json();
        data.results?.forEach(item => {
          if (item.previewUrl && !results.find(r => r.title === item.trackName)) {
            results.push({
              title:      item.trackName,
              artist:     item.artistName,
              album:      item.collectionName,
              duration:   '0:30',
              emoji:      '🎵',
              preview:    item.previewUrl,
              artworkUrl: item.artworkUrl100?.replace('100x100', '300x300'),
            });
          }
        });
      }
    } catch(e) {}

    if (searchH2) searchH2.textContent = results.length
      ? `Results for "${q}" (${results.length} tracks)`
      : `No results for "${q}"`;

    if (genreGrid) {
      genreGrid.innerHTML = '';
      if (!results.length) {
        genreGrid.innerHTML = '<div style="color:var(--text-secondary);font-size:13px">No tracks found.</div>';
        return;
      }
      results.slice(0, 16).forEach(track => {
        const card = document.createElement('div');
        card.className = 'genre-card';
        card.style.cssText = 'background:#282828;cursor:pointer;position:relative';

        const art = track.artworkUrl
          ? `<img src="${track.artworkUrl}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:8px;opacity:0.5" onerror="this.remove()">`
          : '';

        card.innerHTML = `
          ${art}
          <span style="position:relative;z-index:1">${track.title}<br>
            <small style="font-weight:400;opacity:0.75">${track.artist}</small>
          </span>
          <span class="genre-emoji" style="position:relative;z-index:1">${track.emoji || '🎵'}</span>
        `;
        card.addEventListener('click', () => Player.play(track, results, results.indexOf(track)));
        genreGrid.appendChild(card);
      });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      clearTimeout(searchTimer);
      const q = e.target.value.trim();
      searchTimer = setTimeout(() => doSearch(q), 350);
    });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
        UI.navigateTo('search');
      }
    });
  }

  // ── Library filter buttons ────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ── Create Playlist modal ─────────────────────────────
  const overlay = document.getElementById('modalOverlay');
  const sidebarPlaylists = document.getElementById('sidebarPlaylists');
  let playlistCount = sidebarPlaylists?.querySelectorAll('li').length || 0;

  document.getElementById('createPlaylistBtn')?.addEventListener('click', () => {
    playlistCount++;
    const input = document.getElementById('playlistNameInput');
    input.placeholder = `My Playlist #${playlistCount}`;
    input.value = '';
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 60);
  });

  document.getElementById('cancelModal')?.addEventListener('click',  () => overlay.classList.remove('open'));
  overlay?.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  document.getElementById('confirmModal')?.addEventListener('click', () => {
    const input = document.getElementById('playlistNameInput');
    const name  = input.value.trim() || input.placeholder;
    const li    = document.createElement('li');
    li.innerHTML = `<a href="#">${name}</a>`;
    li.querySelector('a').addEventListener('click', e => {
      e.preventDefault();
      UI.showPlaylistPage({ name, emoji: '🎵', color: '#535353' }, DATA.tracks.default);
    });
    sidebarPlaylists?.appendChild(li);
    overlay.classList.remove('open');
    Player.showToast(`✅ Playlist "${name}" created`);
  });

  document.getElementById('playlistNameInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter')  document.getElementById('confirmModal')?.click();
    if (e.key === 'Escape') overlay.classList.remove('open');
  });

  // ── Genre card clicks → search that genre ─────────────
  document.getElementById('genreGrid')?.addEventListener('click', e => {
    const card = e.target.closest('.genre-card');
    if (!card) return;
    const genre = card.querySelector('span')?.textContent;
    if (genre && searchInput) {
      searchInput.value = genre;
      doSearch(genre);
    }
  });

});
