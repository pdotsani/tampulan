import routes from '../config/routes';
import { spotifyFetchWrapper } from '../utils';

export async function getAccessToken(api: any) {
  const response = await api.authenticate();
  const accessToken = response.accessToken.access_token;
  return accessToken;
};

export async function getCategory(accessToken: string) {
  return spotifyFetchWrapper(routes.SPOTIFY_GET_CATEGORY, accessToken);
};

export async function getPlaylists(accessToken: string, categoryId: string) {
  return spotifyFetchWrapper(routes.SPOTIFY_GET_PLAYLISTS(categoryId), accessToken);
}

export async function getTracks(accessToken: string, playlistId: string) {
  return spotifyFetchWrapper(routes.SPOTIFY_GET_TRACKS(playlistId), accessToken);
}
