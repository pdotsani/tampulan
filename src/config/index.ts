import crypto from 'crypto';

const port = process.env.PORT || 3000;
const algorhitm = process.env.ENCRYPTION_ALGORITHIM || "aes-256-ctr";

export default {
  // Spotify API
  SPOTIFY_ROOT_URL: 'https://api.spotify.com/v1',
  SPOTIFY_GET_CATEGORY: '/browse/categories/focus?locale=en',
  SPOTIFY_GET_PLAYLISTS: (categoryId: string) => `/browse/categories/${categoryId}/playlists`,
  SPOTIFY_GET_TRACKS: (playlistId: string) => `/playlists/${playlistId}/tracks`,
  
  // API
  GET_TRACKS: '/v1/tracks',
  SWAP_ENDPOINT: '/v1/swap',
  REFRESH_ENDPOINT: '/v1/refresh',
  PORT: port,
  API_URL: process.env.API_URL || `http://localhost:${port}`,

  // Crypto
  CRYPTO_ALGORITHIM: algorhitm,
  CRYPTO_KEY: crypto.randomBytes(32),
  CRYPTO_IV: crypto.randomBytes(16),
};
