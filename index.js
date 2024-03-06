const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

function getClientCredentials() {
  spotifyApi.clientCredentialsGrant().then((data) => {
    console.log("access: ", data.body)
  });
}

app.listen(port, () => {
  console.log(`Tampulan api listening on port ${port}`)
  getClientCredentials();
})