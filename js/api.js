/**
 * api.js — Frontend ↔ Backend bridge
 * All API calls go through this module.
 * Falls back to local DATA if backend is unavailable.
 */

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://spotify-clone-jms8.onrender.com/api';

const Api = (() => {

  // ── Auth helpers ─────────────────────────────────────────
  function getToken() { return localStorage.getItem('sp_token'); }
  function setToken(t) { localStorage.setItem('sp_token', t); }
  function clearToken() { localStorage.removeItem('sp_token'); }
  function getUser() {
    try { return JSON.parse(localStorage.getItem('sp_user')); } catch { return null; }
  }
  function setUser(u) { localStorage.setItem('sp_user', JSON.stringify(u)); }
  function clearUser() { localStorage.removeItem('sp_user'); }

  // ── Generic fetch wrapper ─────────────────────────────────
  async function request(path, options = {}) {
    const token = getToken();
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
    return data;
  }

  // ── Auth ─────────────────────────────────────────────────
  async function register(name, email, password) {
    const data = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  async function login(email, password) {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  }

  function logout() {
    clearToken();
    clearUser();
    updateAuthUI();
  }

  // ── Tracks ───────────────────────────────────────────────
  async function getTracksByGenre(genre) {
    try {
      const data = await request(`/tracks?genre=${encodeURIComponent(genre)}&limit=20`);
      return data.tracks;
    } catch {
      // Fallback to local DATA
      return DATA.tracks[genre] || DATA.tracks.default;
    }
  }

  async function searchTracks(q) {
    try {
      const data = await request(`/tracks/search?q=${encodeURIComponent(q)}`);
      return data.tracks;
    } catch {
      // Fallback: search local DATA
      const results = [];
      Object.values(DATA.tracks).forEach(list => {
        list.forEach(t => {
          const match = t.title.toLowerCase().includes(q.toLowerCase()) ||
                        t.artist.toLowerCase().includes(q.toLowerCase());
          if (match && !results.find(r => r.title === t.title)) results.push(t);
        });
      });
      return results.slice(0, 16);
    }
  }

  async function getPreview(title, artist) {
    try {
      const data = await request(
        `/tracks/preview?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`
      );
      return data.previewUrl;
    } catch {
      return null;
    }
  }

  async function incrementPlay(trackId) {
    if (!trackId) return;
    try { await request(`/tracks/${trackId}/play`, { method: 'POST' }); } catch {}
  }

  // ── Likes ────────────────────────────────────────────────
  async function toggleLike(trackId) {
    if (!getToken()) { Player.showToast('🔐 Login to like songs'); return null; }
    try {
      const data = await request(`/likes/${trackId}`, { method: 'POST' });
      return data.liked;
    } catch (err) {
      Player.showToast('⚠️ Could not update like');
      return null;
    }
  }

  async function getLikedSongs() {
    if (!getToken()) return [];
    try {
      const data = await request('/likes');
      return data.tracks;
    } catch {
      return [];
    }
  }

  // ── Playlists ─────────────────────────────────────────────
  async function getPlaylists() {
    if (!getToken()) return [];
    try {
      const data = await request('/playlists');
      return data.playlists;
    } catch {
      return [];
    }
  }

  async function createPlaylist(name, emoji, color) {
    if (!getToken()) { Player.showToast('🔐 Login to create playlists'); return null; }
    try {
      const data = await request('/playlists', {
        method: 'POST',
        body: JSON.stringify({ name, emoji: emoji || '🎵', color: color || '#535353' }),
      });
      return data.playlist;
    } catch (err) {
      Player.showToast('⚠️ Could not create playlist: ' + err.message);
      return null;
    }
  }

  // ── UI: update user display ───────────────────────────────
  function updateAuthUI() {
    const user = getUser();
    const nameEl   = document.getElementById('user-name-display');
    const avatarEl = document.getElementById('user-avatar-display');
    const loginBtn = document.getElementById('authLoginBtn');
    const logoutBtn = document.getElementById('authLogoutBtn');

    if (user) {
      if (nameEl)   nameEl.textContent   = user.name || 'User';
      if (avatarEl) avatarEl.textContent = (user.name?.[0] || 'U').toUpperCase();
      if (loginBtn)  loginBtn.style.display  = 'none';
      if (logoutBtn) logoutBtn.style.display = '';
    } else {
      if (nameEl)   nameEl.textContent   = 'Log In';
      if (avatarEl) avatarEl.textContent = '?';
      if (loginBtn)  loginBtn.style.display  = '';
      if (logoutBtn) logoutBtn.style.display = 'none';
    }
  }

  return {
    // auth
    register, login, logout, getToken, getUser, updateAuthUI,
    // tracks
    getTracksByGenre, searchTracks, getPreview, incrementPlay,
    // likes
    toggleLike, getLikedSongs,
    // playlists
    getPlaylists, createPlaylist,
  };
})();
