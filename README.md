# Spotify Clone

A fully functional Spotify UI clone built with vanilla HTML, CSS, and JavaScript.

## Features

- **Home page** with Quick Picks, Featured Charts, Made For You, Recently Played, Trending Now
- **Search page** with genre grid and live search across all tracks
- **Your Library** with filter buttons (Playlists, Albums, Artists)
- **Playlist/Album pages** with track listing and playback
- **Music Player** with:
  - Play / Pause
  - Next / Previous track
  - Shuffle mode
  - Repeat (off / all / one)
  - Progress bar with seek
  - Volume control + mute
  - Like button
- **Create Playlist** modal
- **Keyboard shortcuts**: Space = play/pause, Alt+→ = next, Alt+← = prev, Ctrl+K = search
- Fully responsive dark theme matching Spotify's design

## File Structure

```
spotify-clone/
├── index.html          # Main app shell
├── css/
│   ├── reset.css       # CSS reset & scrollbar
│   ├── main.css        # Layout, cards, pages, modals
│   ├── sidebar.css     # Sidebar + main content area
│   ├── player.css      # Player bar styles
│   └── home.css        # Home-specific styles, colors, animations
├── js/
│   ├── data.js         # All mock data (tracks, playlists, genres)
│   ├── player.js       # Player logic (play, pause, seek, shuffle, repeat)
│   ├── ui.js           # UI rendering functions
│   └── app.js          # App init, event wiring, navigation
└── README.md
```

## How to Run

Just open `index.html` in any modern browser — no build step needed!

> Note: This is a UI clone only. It does not stream real audio. For real audio, replace the `Player.play()` logic with the Web Audio API and actual audio sources.
