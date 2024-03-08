const port = process.env.PORT || 3000;

export default {
  // Spotify API
  SPOTIFY_ROOT_URL: 'https://api.spotify.com/v1',
  SPOTIFY_GET_CATEGORY: '/browse/categories/focus?locale=en',
  SPOTIFY_GET_PLAYLISTS: (categoryId: string) => `/browse/categories/${categoryId}/playlists`,
  SPOTIFY_GET_TRACKS: (playlistId: string) => `/playlists/${playlistId}/tracks`,
  
  // API
  GET_TRACKS: '/v1/tracks',
  PORT: port,
  API_URL: process.env.API_URL || `http://localhost:${port}`
};
