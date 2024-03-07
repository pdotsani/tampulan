export default {
  ROOT_API_URL: 'https://api.spotify.com/v1',
  GET_CATEGORY: '/browse/categories/focus?locale=en',
  GET_PLAYLISTS: (categoryId: string) => `/browse/categories/${categoryId}/playlists`
};
