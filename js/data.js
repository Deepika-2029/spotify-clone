const DATA = {
  quickPicks: [
    { name: "Top Hindi Hits", emoji: "🇮🇳", color: "linear-gradient(135deg,#ff9933,#138808)", tracks: "hindi_hits" },
    { name: "Punjabi Beats", emoji: "🥁", color: "#e8115b", tracks: "punjabi" },
    { name: "Sufi & Ghazal", emoji: "🕯️", color: "#ba5d07", tracks: "sufi" },
    { name: "90s Bollywood", emoji: "📼", color: "#0d73ec", tracks: "retro_90s" },
    { name: "Old is Gold", emoji: "📻", color: "#1e3264", tracks: "old_bollywood" },
    { name: "Devotional", emoji: "🕉️", color: "#f59b23", tracks: "devotional" },
    { name: "South Indian Hits", emoji: "🎬", color: "#8400e7", tracks: "south" },
    { name: "Lofi Beats", emoji: "🎧", color: "#27856a", tracks: "lofi" },
  ],

  featuredCharts: [
    { title: "Top 50 - India", sub: "Most played tracks in India right now.", emoji: "🇮🇳", color: 1, tracks: "hindi_hits" },
    { title: "Top 50 - Global", sub: "Most played tracks right now worldwide.", emoji: "🌍", color: 0, tracks: "global" },
    { title: "Viral 50 - India", sub: "The most viral tracks right now.", emoji: "📈", color: 2, tracks: "punjabi" },
    { title: "Bhojpuri Blockbusters", sub: "Trending in UP & Bihar", emoji: "🕺", color: 3, tracks: "bhojpuri" },
    { title: "EDM Top Tracks", sub: "Festival anthems", emoji: "🎛️", color: 4, tracks: "edm" },
  ],

  madeForYou: [
    { title: "Desi Hip Hop", sub: "The best of Indian Hip Hop", emoji: "🎤", color: 5, tracks: "desi_hiphop" },
    { title: "K-Pop Superhits", sub: "BTS, Blackpink and more", emoji: "🌸", color: 6, tracks: "kpop" },
    { title: "Indian Indie", sub: "Acoustic and soulful", emoji: "🎸", color: 7, tracks: "indie" },
    { title: "Bollywood Romance", sub: "Love songs for you", emoji: "❤️", color: 8, tracks: "hindi_romance" },
    { title: "Workout Beats", sub: "High energy tracks", emoji: "💪", color: 9, tracks: "workout" },
  ],

  recentlyPlayed: [
    { title: "Classical Music", sub: "Playlist", emoji: "🎻", color: 10, tracks: "classical" },
    { title: "2000s Nostalgia", sub: "Playlist", emoji: "💿", color: 11, tracks: "retro_2000s" },
    { title: "Sufi Nights", sub: "Playlist", emoji: "🌙", color: 0, tracks: "sufi" },
    { title: "Party Anthems", sub: "Playlist", emoji: "🎉", color: 1, tracks: "party" },
    { title: "Bhajans", sub: "Playlist", emoji: "🙏", color: 2, tracks: "devotional" },
  ],

  trendingNow: [
    { title: "Chaleya", sub: "Arijit Singh", emoji: "💃", color: 6, tracks: "hindi_hits" },
    { title: "Lover", sub: "Diljit Dosanjh", emoji: "❤️", color: 3, tracks: "punjabi" },
    { title: "Naa Ready", sub: "Anirudh", emoji: "🔥", color: 5, tracks: "south" },
    { title: "Cupid", sub: "FIFTY FIFTY", emoji: "💘", color: 4, tracks: "kpop" },
    { title: "Lollipop Lagelu", sub: "Pawan Singh", emoji: "🍭", color: 7, tracks: "bhojpuri" },
  ],

  genres: [
    { name: "Hindi", emoji: "🇮🇳", bg: "linear-gradient(135deg, #f59b23, #d35400)" },
    { name: "Punjabi", emoji: "🥁", bg: "linear-gradient(135deg, #e8115b, #c0392b)" },
    { name: "Bhojpuri", emoji: "🕺", bg: "linear-gradient(135deg, #f1c40f, #f39c12)" },
    { name: "South", emoji: "🎬", bg: "linear-gradient(135deg, #9b59b6, #8e44ad)" },
    { name: "Sufi & Ghazal", emoji: "🕯️", bg: "linear-gradient(135deg, #ba5d07, #d35400)" },
    { name: "Devotional", emoji: "🕉️", bg: "linear-gradient(135deg, #e67e22, #d35400)" },
    { name: "Retro (90s)", emoji: "📼", bg: "linear-gradient(135deg, #3498db, #2980b9)" },
    { name: "Old Bollywood", emoji: "📻", bg: "linear-gradient(135deg, #2c3e50, #000000)" },
    { name: "Lofi", emoji: "🎧", bg: "linear-gradient(135deg, #1abc9c, #16a085)" },
    { name: "Pop", emoji: "🎵", bg: "linear-gradient(135deg, #e91429, #c0392b)" },
    { name: "Hip-Hop", emoji: "🎤", bg: "linear-gradient(135deg, #ba5d07, #d35400)" },
    { name: "Rock", emoji: "🎸", bg: "linear-gradient(135deg, #1e3264, #2c3e50)" },
    { name: "EDM", emoji: "🎛️", bg: "linear-gradient(135deg, #8400e7, #8e44ad)" },
    { name: "K-Pop", emoji: "🌸", bg: "linear-gradient(135deg, #9cf0e1, #16a085)" },
    { name: "Classical", emoji: "🎻", bg: "linear-gradient(135deg, #0d73ec, #2980b9)" },
  ],

  library: [
    { name: "Liked Songs", meta: "Playlist • 120 songs", emoji: "💜", color: "linear-gradient(135deg,#450af5,#c4efd9)", tracks: "liked" },
    { name: "Old Bollywood", meta: "Playlist • 500 songs", emoji: "📻", color: "#1e3264", tracks: "old_bollywood" },
    { name: "90s Nostalgia", meta: "Playlist • 150 songs", emoji: "📼", color: "#0d73ec", tracks: "retro_90s" },
    { name: "Devotional", meta: "Playlist • 80 songs", emoji: "🙏", color: "#f59b23", tracks: "devotional" },
    { name: "South Indian Hits", meta: "Playlist • 90 songs", emoji: "🎬", color: "#8400e7", tracks: "south" },
  ],

  tracks: {
    hindi_hits: [
      { title: "Chaleya", artist: "Arijit Singh", duration: "3:20", emoji: "💃" },
      { title: "Kesariya", artist: "Arijit Singh", duration: "4:28", emoji: "🎵" },
      { title: "Jhoome Jo Pathaan", artist: "Arijit Singh", duration: "3:28", emoji: "🕺" },
      { title: "O Maahi", artist: "Arijit Singh", duration: "3:53", emoji: "❤️" },
      { title: "Apna Bana Le", artist: "Arijit Singh", duration: "4:21", emoji: "🐺" },
      { title: "Satranga", artist: "Arijit Singh", duration: "4:30", emoji: "🌈" },
      { title: "Pyaar Hota Kayi Baar Hai", artist: "Arijit Singh", duration: "3:36", emoji: "💔" },
      { title: "Tere Vaaste", artist: "Varun Jain", duration: "3:09", emoji: "✨" },
      { title: "Phir Aur Kya Chahiye", artist: "Arijit Singh", duration: "4:26", emoji: "🎶" },
      { title: "Manike", artist: "Yohani", duration: "3:17", emoji: "💃" },
      { title: "Dil Jhoom", artist: "Arijit Singh", duration: "5:04", emoji: "🕺" },
      { title: "Saanjha", artist: "Sachet Tandon", duration: "4:15", emoji: "🌅" }
    ],
    punjabi: [
      { title: "Lover", artist: "Diljit Dosanjh", duration: "3:14", emoji: "❤️" },
      { title: "Brown Munde", artist: "AP Dhillon", duration: "4:27", emoji: "🔥" },
      { title: "Cheques", artist: "Shubh", duration: "3:04", emoji: "💸" },
      { title: "295", artist: "Sidhu Moose Wala", duration: "4:30", emoji: "👑" },
      { title: "Excuses", artist: "AP Dhillon", duration: "2:56", emoji: "😎" },
      { title: "So High", artist: "Sidhu Moose Wala", duration: "3:58", emoji: "🦅" },
      { title: "No Love", artist: "Shubh", duration: "2:50", emoji: "💔" },
      { title: "Insane", artist: "AP Dhillon", duration: "3:26", emoji: "🤪" },
      { title: "Lemonade", artist: "Diljit Dosanjh", duration: "2:59", emoji: "🍋" },
      { title: "We Rollin", artist: "Shubh", duration: "3:19", emoji: "🚗" },
      { title: "Pasoori", artist: "Ali Sethi", duration: "3:44", emoji: "🌺" }
    ],
    desi_hiphop: [
      { title: "Mirchi", artist: "DIVINE", duration: "3:16", emoji: "🌶️" },
      { title: "Machaayenge", artist: "Emiway Bantai", duration: "2:34", emoji: "🔥" },
      { title: "Vanjara", artist: "Krsna", duration: "3:10", emoji: "🎤" },
      { title: "Asli Hai", artist: "Naezy", duration: "3:00", emoji: "💯" },
      { title: "Baazigar", artist: "DIVINE", duration: "2:52", emoji: "🦅" },
      { title: "Kohinoor", artist: "DIVINE", duration: "3:05", emoji: "💎" },
      { title: "Farak", artist: "DIVINE", duration: "3:41", emoji: "✨" },
      { title: "Sher Aya Sher", artist: "DIVINE", duration: "2:13", emoji: "🦁" }
    ],
    bhojpuri: [
      { title: "Lollipop Lagelu", artist: "Pawan Singh", duration: "4:00", emoji: "🍭" },
      { title: "Rinkiya Ke Papa", artist: "Manoj Tiwari", duration: "3:45", emoji: "👨‍👧" },
      { title: "Chhalakata Hamro Jawaniya", artist: "Pawan Singh", duration: "3:30", emoji: "💃" },
      { title: "Raja Raja Kareja Mein Samaja", artist: "Radha Pandey", duration: "4:12", emoji: "❤️" },
      { title: "Nathuniya", artist: "Khesari Lal Yadav", duration: "3:45", emoji: "✨" },
      { title: "Piyawa Se Pehle", artist: "Ritesh Pandey", duration: "4:20", emoji: "😢" }
    ],
    south: [
      { title: "Naa Ready", artist: "Anirudh Ravichander", duration: "3:30", emoji: "🔥" },
      { title: "Hukum", artist: "Anirudh Ravichander", duration: "3:15", emoji: "👑" },
      { title: "Arabic Kuthu", artist: "Anirudh Ravichander", duration: "3:40", emoji: "💃" },
      { title: "Oo Antava", artist: "Devi Sri Prasad", duration: "3:45", emoji: "🎵" },
      { title: "Srivalli", artist: "Sid Sriram", duration: "3:40", emoji: "❤️" },
      { title: "Ranjithame", artist: "Thalapathy Vijay", duration: "4:47", emoji: "🎉" },
      { title: "Rowdy Baby", artist: "Dhanush", duration: "4:44", emoji: "🕺" }
    ],
    sufi: [
      { title: "Afreen Afreen", artist: "Rahat Fateh Ali Khan", duration: "6:00", emoji: "✨" },
      { title: "Kun Faya Kun", artist: "A.R. Rahman", duration: "7:00", emoji: "🕌" },
      { title: "Tajdar-E-Haram", artist: "Atif Aslam", duration: "8:00", emoji: "🕋" },
      { title: "Hoshwalon Ko Khabar", artist: "Jagjit Singh", duration: "5:00", emoji: "🕯️" },
      { title: "O Re Piya", artist: "Rahat Fateh Ali Khan", duration: "6:20", emoji: "❤️" },
      { title: "Tum Itna Jo", artist: "Jagjit Singh", duration: "5:15", emoji: "🌙" },
      { title: "Tere Mast Mast Do Nain", artist: "Rahat Fateh Ali Khan", duration: "5:59", emoji: "👀" },
      { title: "Jag Ghoomeya", artist: "Rahat Fateh Ali Khan", duration: "4:42", emoji: "🌍" }
    ],
    devotional: [
      { title: "Shri Hanuman Chalisa", artist: "Hariharan", duration: "9:40", emoji: "🕉️" },
      { title: "Achyutam Keshavam", artist: "Shreya Ghoshal", duration: "5:00", emoji: "🙏" },
      { title: "Aigiri Nandini", artist: "Rajalakshmee", duration: "6:20", emoji: "🔱" },
      { title: "Namastey Sharda Devi", artist: "Lata Mangeshkar", duration: "4:00", emoji: "📿" },
      { title: "Om Jai Jagdish Hare", artist: "Anuradha Paudwal", duration: "5:30", emoji: "🪔" },
      { title: "Kaal Bhairav Ashtakam", artist: "Anuradha Paudwal", duration: "6:45", emoji: "🛕" }
    ],
    old_bollywood: [
      { title: "Lag Ja Gale", artist: "Lata Mangeshkar", duration: "4:15", emoji: "📻" },
      { title: "Khabar-E-Tahayyur-E-Ishq", artist: "Kishore Kumar", duration: "3:50", emoji: "🎤" },
      { title: "Roop Tera Mastana", artist: "Kishore Kumar", duration: "3:45", emoji: "🌟" },
      { title: "Pal Pal Dil Ke Paas", artist: "Kishore Kumar", duration: "5:20", emoji: "❤️" },
      { title: "Mere Sapno Ki Rani", artist: "Kishore Kumar", duration: "5:00", emoji: "🚂" },
      { title: "Chura Liya Hai Tumne", artist: "Asha Bhosle", duration: "4:48", emoji: "🎸" },
      { title: "Ek Ajnabee Haseena Se", artist: "Kishore Kumar", duration: "4:26", emoji: "✨" },
      { title: "Yeh Dosti Hum Nahi", artist: "Kishore Kumar", duration: "5:21", emoji: "🤝" }
    ],
    retro_90s: [
      { title: "Tujhe Dekha Toh", artist: "Kumar Sanu", duration: "5:02", emoji: "🚂" },
      { title: "Pehla Nasha", artist: "Udit Narayan", duration: "4:49", emoji: "🚲" },
      { title: "Dil To Pagal Hai", artist: "Lata Mangeshkar", duration: "5:38", emoji: "💃" },
      { title: "Ek Ladki Ko Dekha", artist: "Kumar Sanu", duration: "4:36", emoji: "👀" },
      { title: "Chaiyya Chaiyya", artist: "Sukhwinder Singh", duration: "6:54", emoji: "🚂" },
      { title: "Kuch Kuch Hota Hai", artist: "Udit Narayan", duration: "4:56", emoji: "❤️" },
      { title: "Mera Dil Bhi Kitna", artist: "Kumar Sanu", duration: "5:25", emoji: "💖" },
      { title: "Taal Se Taal", artist: "Alka Yagnik", duration: "6:18", emoji: "🌧️" }
    ],
    retro_2000s: [
      { title: "Tum Hi Ho Bandhu", artist: "Neeraj Shridhar", duration: "4:42", emoji: "🎉" },
      { title: "Tera Hone Laga Hoon", artist: "Atif Aslam", duration: "5:00", emoji: "❤️" },
      { title: "Desi Girl", artist: "Shankar Mahadevan", duration: "4:06", emoji: "💃" },
      { title: "Khuda Jaane", artist: "KK", duration: "5:33", emoji: "✨" },
      { title: "Kal Ho Naa Ho", artist: "Sonu Nigam", duration: "5:21", emoji: "🌆" },
      { title: "Mitwa", artist: "Shafqat Amanat Ali", duration: "6:22", emoji: "🏏" },
      { title: "Kajra Re", artist: "Alisha Chinai", duration: "8:02", emoji: "👁️" },
      { title: "Bole Chudiyan", artist: "Kavita Krishnamurthy", duration: "6:48", emoji: "🎆" }
    ],
    lofi: [
      { title: "Tum Hi Ho (Lofi)", artist: "Lofi Beats", duration: "4:00", emoji: "🎧" },
      { title: "Agar Tum Saath Ho (Lofi)", artist: "Lofi Beats", duration: "3:45", emoji: "🌧️" },
      { title: "Kun Faya Kun (Lofi)", artist: "Lofi Beats", duration: "4:10", emoji: "🌙" },
      { title: "Chaleya (Lofi)", artist: "Lofi Beats", duration: "3:20", emoji: "✨" },
      { title: "Mera Mann (Lofi)", artist: "Lofi Beats", duration: "3:50", emoji: "🍃" }
    ],
    global: [
      { title: "Flowers", artist: "Miley Cyrus", duration: "3:20", emoji: "🌸" },
      { title: "As It Was", artist: "Harry Styles", duration: "2:37", emoji: "✨" },
      { title: "Blinding Lights", artist: "The Weeknd", duration: "3:22", emoji: "💡" },
      { title: "Shape of You", artist: "Ed Sheeran", duration: "3:53", emoji: "🎵" },
      { title: "Watermelon Sugar", artist: "Harry Styles", duration: "2:54", emoji: "🍉" },
      { title: "Stay", artist: "The Kid LAROI", duration: "2:21", emoji: "💙" },
      { title: "Levitating", artist: "Dua Lipa", duration: "3:24", emoji: "🪐" },
      { title: "Save Your Tears", artist: "The Weeknd", duration: "3:36", emoji: "😢" }
    ],
    edm: [
      { title: "Titanium", artist: "David Guetta", duration: "4:05", emoji: "🎛️" },
      { title: "Wake Me Up", artist: "Avicii", duration: "4:07", emoji: "◢ ◤" },
      { title: "Closer", artist: "The Chainsmokers", duration: "4:04", emoji: "🎹" },
      { title: "Lean On", artist: "Major Lazer", duration: "2:56", emoji: "💃" },
      { title: "Don't You Worry Child", artist: "Swedish House Mafia", duration: "3:32", emoji: "🏠" },
      { title: "Levels", artist: "Avicii", duration: "3:19", emoji: "⚡" }
    ],
    kpop: [
      { title: "Dynamite", artist: "BTS", duration: "3:19", emoji: "💥" },
      { title: "Butter", artist: "BTS", duration: "2:44", emoji: "🥞" },
      { title: "How You Like That", artist: "BLACKPINK", duration: "3:01", emoji: "🖤" },
      { title: "Cupid", artist: "FIFTY FIFTY", duration: "2:54", emoji: "💘" },
      { title: "Boy With Luv", artist: "BTS", duration: "3:49", emoji: "💖" },
      { title: "Kill This Love", artist: "BLACKPINK", duration: "3:09", emoji: "💔" }
    ],
    classical: [
      { title: "Raga Yaman", artist: "Ravi Shankar", duration: "10:00", emoji: "🎻" },
      { title: "Raga Bhairavi", artist: "Zakir Hussain", duration: "8:00", emoji: "🥁" },
      { title: "Symphony No. 5", artist: "Beethoven", duration: "6:00", emoji: "🎹" },
      { title: "Clair de Lune", artist: "Claude Debussy", duration: "5:00", emoji: "🌙" },
      { title: "Four Seasons", artist: "Vivaldi", duration: "10:00", emoji: "🍂" }
    ],
    hindi_romance: [
      { title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:42", emoji: "❤️" },
      { title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", duration: "4:44", emoji: "💔" },
      { title: "Dil Diyan Gallan", artist: "Atif Aslam", duration: "4:13", emoji: "🎶" },
      { title: "Tum Se Hi", artist: "Mohit Chauhan", duration: "5:23", emoji: "🌧️" },
      { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", duration: "3:56", emoji: "💍" }
    ],
    indie: [
      { title: "Alag Aasmaan", artist: "Anuv Jain", duration: "3:32", emoji: "🎸" },
      { title: "Baarishein", artist: "Anuv Jain", duration: "3:27", emoji: "🌧️" },
      { title: "Kasoor", artist: "Prateek Kuhad", duration: "3:16", emoji: "✨" },
      { title: "Cold/Mess", artist: "Prateek Kuhad", duration: "4:45", emoji: "💔" },
      { title: "Liggi", artist: "Ritviz", duration: "3:01", emoji: "🕺" }
    ],
    chill: [
      { title: "Sunset Lover", artist: "Petit Biscuit", duration: "4:15", emoji: "🌅" },
      { title: "Skinny Love", artist: "Bon Iver", duration: "3:58", emoji: "❄️" },
      { title: "Wait", artist: "M83", duration: "5:44", emoji: "🌌" },
      { title: "Youth", artist: "Daughter", duration: "4:13", emoji: "🍃" }
    ],
    workout: [
      { title: "Eye of the Tiger", artist: "Survivor", duration: "4:04", emoji: "🐯" },
      { title: "Stronger", artist: "Kanye West", duration: "5:12", emoji: "🔥" },
      { title: "Remember The Name", artist: "Fort Minor", duration: "3:50", emoji: "💪" },
      { title: "Till I Collapse", artist: "Eminem", duration: "4:57", emoji: "🏋️" }
    ],
    party: [
      { title: "Levitating", artist: "Dua Lipa", duration: "3:24", emoji: "🪐" },
      { title: "Bad Guy", artist: "Billie Eilish", duration: "3:14", emoji: "😈" },
      { title: "Uptown Funk", artist: "Bruno Mars", duration: "4:30", emoji: "🕺" },
      { title: "Party Rock Anthem", artist: "LMFAO", duration: "4:22", emoji: "🎉" }
    ],
    liked: [
      { title: "Perfect", artist: "Ed Sheeran", duration: "4:23", emoji: "💚" },
      { title: "Lag Ja Gale", artist: "Lata Mangeshkar", duration: "4:15", emoji: "📻" },
      { title: "Shape of You", artist: "Ed Sheeran", duration: "3:53", emoji: "🎵" },
      { title: "Chaleya", artist: "Arijit Singh", duration: "3:20", emoji: "💃" },
      { title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:42", emoji: "❤️" }
    ],
    default: [
      { title: "As It Was", artist: "Harry Styles", duration: "2:37", emoji: "✨" },
      { title: "Anti-Hero", artist: "Taylor Swift", duration: "3:21", emoji: "🦸" },
    ]
  }
};
