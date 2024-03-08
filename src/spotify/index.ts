import routes from '../config/routes';

export async function getAccessToken(api: any) {
  const response = await api.authenticate();
  const accessToken = response.accessToken.access_token;
  return accessToken;
};

export async function getCategory(accessToken: string) {
  const response = await fetch(`${routes.SPOTIFY_ROOT_URL}${routes.SPOTIFY_GET_CATEGORY}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
  const data = await response.json();
  return data;
};

export async function getPlaylists(accessToken: string, categoryId: string) {
  const response = await fetch(`${routes.SPOTIFY_ROOT_URL}${routes.SPOTIFY_GET_PLAYLISTS(categoryId)}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const data = await response.json();
  return data;
}

export async function getTracks(accessToken: string, playlistId: string) {
  const response = await fetch(`${routes.SPOTIFY_ROOT_URL}${routes.SPOTIFY_GET_TRACKS(playlistId)}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const data = await response.json();
  return data;
}
