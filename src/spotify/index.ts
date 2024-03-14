import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import routes from '../config/routes';
import { spotifyFetchWrapper } from '../utils';

export default class {
  api = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
  );
  
  private _token: string | undefined;
  
  private setToken(accessToken: string) {
    this._token = accessToken;
  }

  private getToken() {
    return this._token;
  }

  async getAccessToken() {
    const response = await this.api.authenticate();
    const accessToken = response.accessToken.access_token;
    this.setToken(accessToken);
  }

  async getCategory() {
    return spotifyFetchWrapper(routes.SPOTIFY_GET_CATEGORY, this.getToken());
  }

  async getPlaylists(categoryId: string) {
    return spotifyFetchWrapper(routes.SPOTIFY_GET_PLAYLISTS(categoryId), this.getToken());
  }

  async getTracks(playlistId: string) {
    return spotifyFetchWrapper(routes.SPOTIFY_GET_TRACKS(playlistId), this.getToken());
  }  
}