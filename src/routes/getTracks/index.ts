import Spotify from '../../spotify';
import { chooseRamdomPlaylist, createPayload, shuffleTracks } from '../../utils';
import logger from '../../logger';

const log = logger.init();

export default async (_req, res) => {
  const spotify = new Spotify();
  
  await spotify.getAccessToken();
  const category = await spotify.getCategory();
  const playlists = await spotify.getPlaylists(category.id);
  const playlist = await chooseRamdomPlaylist(playlists.playlists);
  const tracks = await spotify.getTracks(playlist.id);
  const shuffledTracks = shuffleTracks(tracks);

  log.info(`Returning ${shuffledTracks.length} tracks`);
  
  res.send(createPayload(shuffledTracks));
}
