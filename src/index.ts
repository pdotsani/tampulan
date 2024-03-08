import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { chooseRamdomPlaylist, createPayload, shuffleTracks } from './utils';
import { getAccessToken, getCategory, getPlaylists, getTracks } from './spotify';
import routes from './config/routes';

dotenv.config();

const app = express();
const PORT = routes.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const api = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET
);

async function init() {
  const token = await getAccessToken(api);
  const category = await getCategory(token);
  const playlists = await getPlaylists(token, category.id);
  const playlist = await chooseRamdomPlaylist(playlists.playlists);
  const tracks = await getTracks(token, playlist.id);
  const shuffledTracks = shuffleTracks(tracks);

  console.log("payload: ", createPayload(shuffledTracks));
}

app.listen(PORT, () => {
  console.log(`Tampulan api listening on port ${PORT}`)
  init();
})
