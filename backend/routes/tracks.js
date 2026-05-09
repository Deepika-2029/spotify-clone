const express = require('express');
const fetch   = require('node-fetch');
const Track   = require('../models/Track');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ── GET /api/tracks ─────────────────────────────────────
// Query params: genre, page, limit
router.get('/', async (req, res) => {
  try {
    const { genre, page = 1, limit = 20 } = req.query;
    const filter = genre ? { genre: genre.toLowerCase() } : {};
    const skip   = (Number(page) - 1) * Number(limit);

    const [tracks, total] = await Promise.all([
      Track.find(filter).sort({ playCount: -1 }).skip(skip).limit(Number(limit)),
      Track.countDocuments(filter),
    ]);

    res.json({ tracks, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('GET /tracks error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/tracks/genres ───────────────────────────────
router.get('/genres', async (req, res) => {
  try {
    const genres = await Track.distinct('genre');
    res.json({ genres: genres.filter(Boolean).sort() });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/tracks/search?q= ────────────────────────────
// Searches local DB first, then falls back to iTunes API
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ tracks: [] });

    // 1. Local DB full-text search
    let tracks = await Track.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } }).limit(10);

    // 2. If fewer than 3 local results → hit iTunes API as proxy
    if (tracks.length < 3) {
      try {
        const itunesRes = await fetch(
          `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=12&entity=song`
        );
        if (itunesRes.ok) {
          const data = await itunesRes.json();
          const itunesTracks = (data.results || [])
            .filter(item => item.previewUrl)
            .map(item => ({
              _id:        null,
              title:      item.trackName,
              artist:     item.artistName,
              album:      item.collectionName,
              duration:   '0:30',
              emoji:      '🎵',
              genre:      item.primaryGenreName?.toLowerCase() || 'unknown',
              previewUrl: item.previewUrl,
              artworkUrl: item.artworkUrl100?.replace('100x100', '300x300') || null,
            }));

          // Merge, avoid duplicates
          itunesTracks.forEach(it => {
            const dupe = tracks.find(
              t => t.title.toLowerCase() === it.title.toLowerCase() &&
                   t.artist.toLowerCase() === it.artist.toLowerCase()
            );
            if (!dupe) tracks.push(it);
          });
        }
      } catch (_) { /* iTunes failed — return local results only */ }
    }

    res.json({ tracks: tracks.slice(0, 16) });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/tracks/preview?title=&artist= ───────────────
// iTunes proxy to avoid CORS on frontend
router.get('/preview', async (req, res) => {
  try {
    const { title, artist } = req.query;
    if (!title) return res.status(400).json({ message: 'title is required' });

    // Check DB cache first
    const cached = await Track.findOne({
      title: new RegExp(title, 'i'),
      artist: new RegExp(artist || '', 'i'),
      previewUrl: { $ne: null },
    });
    if (cached) return res.json({ previewUrl: cached.previewUrl, artworkUrl: cached.artworkUrl });

    // Hit iTunes
    const query = encodeURIComponent(`${title} ${artist || ''}`);
    const itunesRes = await fetch(
      `https://itunes.apple.com/search?term=${query}&media=music&limit=1&entity=song`
    );
    if (!itunesRes.ok) return res.status(502).json({ message: 'iTunes API error' });

    const data = await itunesRes.json();
    const item = data.results?.[0];

    if (!item?.previewUrl) return res.status(404).json({ message: 'No preview found' });

    // Cache in DB if track exists
    await Track.findOneAndUpdate(
      { title: new RegExp(title, 'i'), artist: new RegExp(artist || '', 'i') },
      { previewUrl: item.previewUrl, artworkUrl: item.artworkUrl100?.replace('100x100', '300x300') },
      { new: true }
    );

    res.json({
      previewUrl: item.previewUrl,
      artworkUrl: item.artworkUrl100?.replace('100x100', '300x300'),
    });
  } catch (err) {
    console.error('Preview error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/tracks/:id ──────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.json({ track });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/tracks/:id/play ────────────────────────────
// Increment play count
router.post('/:id/play', async (req, res) => {
  try {
    const track = await Track.findByIdAndUpdate(
      req.params.id,
      { $inc: { playCount: 1 } },
      { new: true }
    );
    res.json({ playCount: track?.playCount || 0 });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
