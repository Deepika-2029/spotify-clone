const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title:      { type: String, required: true, trim: true },
  artist:     { type: String, required: true, trim: true },
  album:      { type: String, default: '' },
  duration:   { type: String, default: '3:00' },
  emoji:      { type: String, default: '🎵' },
  genre:      { type: String, default: 'default', lowercase: true },
  previewUrl: { type: String, default: null },
  artworkUrl: { type: String, default: null },
  playCount:  { type: Number, default: 0 },
}, { timestamps: true });

trackSchema.index({ title: 'text', artist: 'text', album: 'text' });
trackSchema.index({ genre: 1 });

module.exports = mongoose.model('Track', trackSchema);
