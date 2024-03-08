import routes from '../config/routes';

export function chooseRamdomPlaylist(playlists: any) {
  const randomIndex = Math.floor(Math.random() * playlists.items.length);
  console.log("choosing playlist: ", playlists.items[randomIndex].name);
  return playlists.items[randomIndex];
};

export function createPayload(shuffledTracks: any) {
  return {
    tracks: shuffledTracks,
    requestMoreTracks: `${routes.API_URL}${routes.GET_TRACKS}`
  }
};

export function shuffleTracks(tracks: any) {
  const shuffledTracks = tracks.items.sort(() => Math.random() - 0.5);
  return shuffledTracks;
};
