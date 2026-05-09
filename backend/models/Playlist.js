const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  emoji:  { type: String, default: '🎵' },
  color:  { type: String, default: '#535353' },
  owner:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Playlist', playlistSchema);
