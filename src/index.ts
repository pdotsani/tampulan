import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import logger from './logger';
import { chooseRamdomPlaylist, createPayload, shuffleTracks } from './utils';
import Spotify from './spotify';
import routes from './config/routes';
import auth from './auth';

dotenv.config();

const app = express();
const PORT = routes.PORT;

const log = logger.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const spotify = new Spotify();

app.get(routes.GET_TRACKS, auth, async (req, res) => {
  log.info(`${req.method} - ${req.originalUrl} - ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} - ${req.get('User-Agent')}`);

  const category = await spotify.getCategory();
  const playlists = await spotify.getPlaylists(category.id);
  const playlist = await chooseRamdomPlaylist(playlists.playlists);
  const tracks = await spotify.getTracks(playlist.id);
  const shuffledTracks = shuffleTracks(tracks);

  log.info(`Returning ${shuffledTracks.length} tracks`);
  
  res.send(createPayload(shuffledTracks));
});

app.listen(PORT, async () => {
  log.info(`Tampulan api listening on port ${PORT}`);
  await spotify.getAccessToken();
  log.info('Spotify Access token retrieved');
});
