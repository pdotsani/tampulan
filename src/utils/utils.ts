import routes from '../config';

function chooseRamdomPlaylist(playlists: any) {
  const randomIndex = Math.floor(Math.random() * playlists.items.length);
  return playlists.items[randomIndex];
};

function createPayload(shuffledTracks: any) {
  return {
    tracks: shuffledTracks,
    requestMoreTracks: `${routes.API_URL}${routes.GET_TRACKS}`
  }
};

async function spotifyFetchWrapper(url: string, accessToken: string) {
  const response = await fetch(`${routes.SPOTIFY_ROOT_URL}${url}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const data = await response.json();
  return data;
}

function shuffleTracks(tracks: any) {
  const shuffledTracks = tracks.items.sort(() => Math.random() - 0.5);
  return shuffledTracks;
};

export {
  chooseRamdomPlaylist,
  createPayload,
  spotifyFetchWrapper,
  shuffleTracks,
}
