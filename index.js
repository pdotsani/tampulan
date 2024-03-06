require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { SpotifyApi } = require("@spotify/web-api-ts-sdk");

const api = SpotifyApi.withClientCredentials(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET
);

let accessToken;

app.listen(port, () => {
  console.log(`Tampulan api listening on port ${port}`)

  api.authenticate().then((data) => {
    console.log(data);
    accessToken = data.accessToken.access_token;
    fetch('https://api.spotify.com/v1/browse/categories/focus?locale=en', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      fetch(`https://api.spotify.com/v1/browse/categories/${data.id}/playlists`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
      });
    })
  });

})