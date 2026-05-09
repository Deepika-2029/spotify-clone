const express = require('express');
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All like routes require authentication
router.use(protect);

// ── GET /api/likes ───────────────────────────────────────
// Get all liked songs for logged-in user
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('likedSongs', 'title artist emoji duration artworkUrl previewUrl genre');
    res.json({ tracks: user.likedSongs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/likes/:trackId ─────────────────────────────
// Toggle like/unlike
router.post('/:trackId', async (req, res) => {
  try {
    const user    = await User.findById(req.user._id);
    const trackId = req.params.trackId;

    const isLiked = user.likedSongs.some(id => id.toString() === trackId);

    if (isLiked) {
      user.likedSongs = user.likedSongs.filter(id => id.toString() !== trackId);
      await user.save();
      return res.json({ liked: false, message: 'Removed from Liked Songs' });
    } else {
      user.likedSongs.push(trackId);
      await user.save();
      return res.json({ liked: true, message: 'Added to Liked Songs' });
    }
  } catch (err) {
    console.error('Like toggle error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/likes/:trackId ──────────────────────────────
// Check if a specific track is liked
router.get('/:trackId', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('likedSongs');
    const liked = user.likedSongs.some(id => id.toString() === req.params.trackId);
    res.json({ liked });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
