import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import routes from './config/routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const api = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET
);

async function getAccessToken() {
  const response = await api.authenticate();
  const accessToken = response.accessToken.access_token;
  return accessToken;
};

async function getCategory(accessToken: string) {
  const response = await fetch(`${routes.ROOT_API_URL}${routes.GET_CATEGORY}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
  const data = await response.json();
  return data;
};

async function getPlaylists(accessToken: string, categoryId: string) {
  const response = await fetch(`${routes.ROOT_API_URL}${routes.GET_PLAYLISTS(categoryId)}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const data = await response.json();
  return data;
}

async function chooseRamdomPlaylist(playlists: any) {
  const randomIndex = Math.floor(Math.random() * playlists.items.length);
  console.log("choosing playlist: ", playlists.items[randomIndex].name);
  return playlists.items[randomIndex];
}

async function getTracks(accessToken: string, playlistId: string) {
  const response = await fetch(`${routes.ROOT_API_URL}${routes.GET_TRACKS(playlistId)}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const data = await response.json();
  return data;
}

async function init() {
  const token = await getAccessToken();
  const category = await getCategory(token);
  const playlists = await getPlaylists(token, category.id);
  const playlist = await chooseRamdomPlaylist(playlists.playlists);
  const tracks = await getTracks(token, playlist.id);
  tracks.items.forEach((track: any) => {
    console.log(track.track.name);
  });
}

app.listen(port, () => {
  console.log(`Tampulan api listening on port ${port}`)
  init();
})
