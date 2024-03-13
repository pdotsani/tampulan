import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import logger from './logger';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { chooseRamdomPlaylist, createPayload, shuffleTracks } from './utils';
import { getAccessToken, getCategory, getPlaylists, getTracks } from './spotify';
import routes from './config/routes';
import auth from './auth';

dotenv.config();

const app = express();
const PORT = routes.PORT;

const log = logger.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const api = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET
);

app.get(routes.GET_TRACKS, auth, async (req, res) => {
  log.info(`${req.method} - ${req.originalUrl} - ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} - ${req.get('User-Agent')}`);

  const token = await getAccessToken(api);
  const category = await getCategory(token);
  const playlists = await getPlaylists(token, category.id);
  const playlist = await chooseRamdomPlaylist(playlists.playlists);
  const tracks = await getTracks(token, playlist.id);
  const shuffledTracks = shuffleTracks(tracks);

  log.info(`Returning ${shuffledTracks.length} tracks`);
  
  res.send(createPayload(shuffledTracks));
});

app.listen(PORT, () => {
  console.log(`Tampulan api listening on port ${PORT}`);
});
