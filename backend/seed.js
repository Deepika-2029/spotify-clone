require('dotenv').config();
const mongoose = require('mongoose');
const Track    = require('./models/Track');

// ── All tracks from data.js, converted to DB format ──────
const seedTracks = [
  // Hindi Hits
  { title: 'Chaleya',               artist: 'Arijit Singh',       duration: '3:20', emoji: '💃', genre: 'hindi_hits' },
  { title: 'Kesariya',              artist: 'Arijit Singh',       duration: '4:28', emoji: '🎵', genre: 'hindi_hits' },
  { title: 'Jhoome Jo Pathaan',     artist: 'Arijit Singh',       duration: '3:28', emoji: '🕺', genre: 'hindi_hits' },
  { title: 'O Maahi',              artist: 'Arijit Singh',       duration: '3:53', emoji: '❤️', genre: 'hindi_hits' },
  { title: 'Apna Bana Le',          artist: 'Arijit Singh',       duration: '4:21', emoji: '🐺', genre: 'hindi_hits' },
  { title: 'Satranga',              artist: 'Arijit Singh',       duration: '4:30', emoji: '🌈', genre: 'hindi_hits' },
  { title: 'Tere Vaaste',           artist: 'Varun Jain',         duration: '3:09', emoji: '✨', genre: 'hindi_hits' },
  { title: 'Phir Aur Kya Chahiye', artist: 'Arijit Singh',       duration: '4:26', emoji: '🎶', genre: 'hindi_hits' },
  { title: 'Manike',               artist: 'Yohani',             duration: '3:17', emoji: '💃', genre: 'hindi_hits' },
  // Punjabi
  { title: 'Lover',                 artist: 'Diljit Dosanjh',     duration: '3:14', emoji: '❤️', genre: 'punjabi' },
  { title: 'Brown Munde',           artist: 'AP Dhillon',         duration: '4:27', emoji: '🔥', genre: 'punjabi' },
  { title: 'Cheques',              artist: 'Shubh',              duration: '3:04', emoji: '💸', genre: 'punjabi' },
  { title: '295',                   artist: 'Sidhu Moose Wala',   duration: '4:30', emoji: '👑', genre: 'punjabi' },
  { title: 'Excuses',              artist: 'AP Dhillon',         duration: '2:56', emoji: '😎', genre: 'punjabi' },
  { title: 'So High',              artist: 'Sidhu Moose Wala',   duration: '3:58', emoji: '🦅', genre: 'punjabi' },
  { title: 'No Love',              artist: 'Shubh',              duration: '2:50', emoji: '💔', genre: 'punjabi' },
  { title: 'Pasoori',              artist: 'Ali Sethi',          duration: '3:44', emoji: '🌺', genre: 'punjabi' },
  // Desi Hip Hop
  { title: 'Mirchi',               artist: 'DIVINE',             duration: '3:16', emoji: '🌶️', genre: 'desi_hiphop' },
  { title: 'Machaayenge',          artist: 'Emiway Bantai',      duration: '2:34', emoji: '🔥', genre: 'desi_hiphop' },
  { title: 'Kohinoor',             artist: 'DIVINE',             duration: '3:05', emoji: '💎', genre: 'desi_hiphop' },
  { title: 'Sher Aya Sher',        artist: 'DIVINE',             duration: '2:13', emoji: '🦁', genre: 'desi_hiphop' },
  // South Indian
  { title: 'Naa Ready',            artist: 'Anirudh Ravichander', duration: '3:30', emoji: '🔥', genre: 'south' },
  { title: 'Hukum',               artist: 'Anirudh Ravichander', duration: '3:15', emoji: '👑', genre: 'south' },
  { title: 'Arabic Kuthu',         artist: 'Anirudh Ravichander', duration: '3:40', emoji: '💃', genre: 'south' },
  { title: 'Srivalli',             artist: 'Sid Sriram',         duration: '3:40', emoji: '❤️', genre: 'south' },
  { title: 'Rowdy Baby',           artist: 'Dhanush',            duration: '4:44', emoji: '🕺', genre: 'south' },
  // Sufi
  { title: 'Afreen Afreen',        artist: 'Rahat Fateh Ali Khan', duration: '6:00', emoji: '✨', genre: 'sufi' },
  { title: 'Kun Faya Kun',         artist: 'A.R. Rahman',        duration: '7:00', emoji: '🕌', genre: 'sufi' },
  { title: 'Tajdar-E-Haram',       artist: 'Atif Aslam',         duration: '8:00', emoji: '🕋', genre: 'sufi' },
  { title: 'O Re Piya',            artist: 'Rahat Fateh Ali Khan', duration: '6:20', emoji: '❤️', genre: 'sufi' },
  // Devotional
  { title: 'Shri Hanuman Chalisa', artist: 'Hariharan',          duration: '9:40', emoji: '🕉️', genre: 'devotional' },
  { title: 'Achyutam Keshavam',    artist: 'Shreya Ghoshal',     duration: '5:00', emoji: '🙏', genre: 'devotional' },
  { title: 'Om Jai Jagdish Hare',  artist: 'Anuradha Paudwal',   duration: '5:30', emoji: '🪔', genre: 'devotional' },
  // Old Bollywood
  { title: 'Lag Ja Gale',          artist: 'Lata Mangeshkar',    duration: '4:15', emoji: '📻', genre: 'old_bollywood' },
  { title: 'Roop Tera Mastana',    artist: 'Kishore Kumar',      duration: '3:45', emoji: '🌟', genre: 'old_bollywood' },
  { title: 'Pal Pal Dil Ke Paas', artist: 'Kishore Kumar',      duration: '5:20', emoji: '❤️', genre: 'old_bollywood' },
  { title: 'Yeh Dosti Hum Nahi',  artist: 'Kishore Kumar',      duration: '5:21', emoji: '🤝', genre: 'old_bollywood' },
  // Retro 90s
  { title: 'Tujhe Dekha Toh',      artist: 'Kumar Sanu',         duration: '5:02', emoji: '🚂', genre: 'retro_90s' },
  { title: 'Pehla Nasha',          artist: 'Udit Narayan',       duration: '4:49', emoji: '🚲', genre: 'retro_90s' },
  { title: 'Chaiyya Chaiyya',      artist: 'Sukhwinder Singh',   duration: '6:54', emoji: '🚂', genre: 'retro_90s' },
  { title: 'Kuch Kuch Hota Hai',   artist: 'Udit Narayan',       duration: '4:56', emoji: '❤️', genre: 'retro_90s' },
  // Lofi
  { title: 'Tum Hi Ho (Lofi)',     artist: 'Lofi Beats',         duration: '4:00', emoji: '🎧', genre: 'lofi' },
  { title: 'Kun Faya Kun (Lofi)',  artist: 'Lofi Beats',         duration: '4:10', emoji: '🌙', genre: 'lofi' },
  { title: 'Chaleya (Lofi)',       artist: 'Lofi Beats',         duration: '3:20', emoji: '✨', genre: 'lofi' },
  // Global
  { title: 'Flowers',             artist: 'Miley Cyrus',        duration: '3:20', emoji: '🌸', genre: 'global' },
  { title: 'As It Was',            artist: 'Harry Styles',       duration: '2:37', emoji: '✨', genre: 'global' },
  { title: 'Blinding Lights',      artist: 'The Weeknd',         duration: '3:22', emoji: '💡', genre: 'global' },
  { title: 'Shape of You',         artist: 'Ed Sheeran',         duration: '3:53', emoji: '🎵', genre: 'global' },
  { title: 'Levitating',           artist: 'Dua Lipa',           duration: '3:24', emoji: '🪐', genre: 'global' },
  // EDM
  { title: 'Titanium',            artist: 'David Guetta',       duration: '4:05', emoji: '🎛️', genre: 'edm' },
  { title: 'Wake Me Up',           artist: 'Avicii',             duration: '4:07', emoji: '☀️', genre: 'edm' },
  { title: 'Levels',               artist: 'Avicii',             duration: '3:19', emoji: '⚡', genre: 'edm' },
  { title: "Don't You Worry Child", artist: 'Swedish House Mafia', duration: '3:32', emoji: '🏠', genre: 'edm' },
  // K-Pop
  { title: 'Dynamite',            artist: 'BTS',                duration: '3:19', emoji: '💥', genre: 'kpop' },
  { title: 'Butter',              artist: 'BTS',                duration: '2:44', emoji: '🥞', genre: 'kpop' },
  { title: 'How You Like That',   artist: 'BLACKPINK',          duration: '3:01', emoji: '🖤', genre: 'kpop' },
  { title: 'Cupid',               artist: 'FIFTY FIFTY',        duration: '2:54', emoji: '💘', genre: 'kpop' },
  // Classical
  { title: 'Raga Yaman',          artist: 'Ravi Shankar',       duration: '10:00', emoji: '🎻', genre: 'classical' },
  { title: 'Clair de Lune',       artist: 'Claude Debussy',     duration: '5:00',  emoji: '🌙', genre: 'classical' },
  // Hindi Romance
  { title: 'Tum Hi Ho',           artist: 'Arijit Singh',       duration: '4:42', emoji: '❤️', genre: 'hindi_romance' },
  { title: 'Tujhe Kitna Chahne Lage', artist: 'Arijit Singh',   duration: '4:44', emoji: '💔', genre: 'hindi_romance' },
  { title: 'Dil Diyan Gallan',    artist: 'Atif Aslam',         duration: '4:13', emoji: '🎶', genre: 'hindi_romance' },
  // Workout
  { title: 'Eye of the Tiger',    artist: 'Survivor',           duration: '4:04', emoji: '🐯', genre: 'workout' },
  { title: 'Stronger',            artist: 'Kanye West',         duration: '5:12', emoji: '🔥', genre: 'workout' },
  { title: 'Till I Collapse',     artist: 'Eminem',             duration: '4:57', emoji: '🏋️', genre: 'workout' },
  // Party
  { title: 'Levitating',         artist: 'Dua Lipa',           duration: '3:24', emoji: '🪐', genre: 'party' },
  { title: 'Uptown Funk',         artist: 'Bruno Mars',         duration: '4:30', emoji: '🕺', genre: 'party' },
  // Liked (defaults)
  { title: 'Perfect',            artist: 'Ed Sheeran',         duration: '4:23', emoji: '💚', genre: 'liked' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing tracks
    await Track.deleteMany({});
    console.log('🗑  Cleared existing tracks');

    // Insert all tracks
    const inserted = await Track.insertMany(seedTracks);
    console.log(`✅ Seeded ${inserted.length} tracks`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
