const express  = require('express');
const Playlist  = require('../models/Playlist');
const User      = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All playlist routes require authentication
router.use(protect);

// ── GET /api/playlists ───────────────────────────────────
// Returns all playlists owned by the logged-in user
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id })
      .populate('tracks', 'title artist emoji duration artworkUrl previewUrl')
      .sort({ createdAt: -1 });
    res.json({ playlists });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/playlists ──────────────────────────────────
// Create a new playlist
router.post('/', async (req, res) => {
  try {
    const { name, emoji, color } = req.body;
    if (!name) return res.status(400).json({ message: 'Playlist name is required' });

    const playlist = await Playlist.create({
      name,
      emoji: emoji || '🎵',
      color: color || '#535353',
      owner: req.user._id,
    });

    // Add to user's playlists array
    await User.findByIdAndUpdate(req.user._id, { $push: { playlists: playlist._id } });

    res.status(201).json({ playlist });
  } catch (err) {
    console.error('Create playlist error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/playlists/:id ───────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('tracks', 'title artist emoji duration artworkUrl previewUrl genre');

    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    res.json({ playlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/playlists/:id/tracks ───────────────────────
// Add a track to a playlist
router.post('/:id/tracks', async (req, res) => {
  try {
    const { trackId } = req.body;
    if (!trackId) return res.status(400).json({ message: 'trackId is required' });

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    if (playlist.tracks.includes(trackId))
      return res.status(409).json({ message: 'Track already in playlist' });

    playlist.tracks.push(trackId);
    await playlist.save();

    res.json({ message: 'Track added', playlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── DELETE /api/playlists/:id/tracks/:trackId ────────────
router.delete('/:id/tracks/:trackId', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    playlist.tracks = playlist.tracks.filter(t => t.toString() !== req.params.trackId);
    await playlist.save();

    res.json({ message: 'Track removed', playlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── DELETE /api/playlists/:id ────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.owner.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await playlist.deleteOne();
    await User.findByIdAndUpdate(req.user._id, { $pull: { playlists: req.params.id } });

    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
