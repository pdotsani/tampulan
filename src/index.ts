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
  console.log("Access Token: ", accessToken);
  return accessToken;
};

async function getCategory(accessToken: string) {
  const response = await fetch(`${routes.ROOT_API_URL}${routes.GET_CATEGORY}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
  const data = await response.json();
  console.log("Category: ", data)
  return data;
};

async function getPlaylists(accessToken: string, categoryId: string) {
  const response = await fetch(`${routes.ROOT_API_URL}${routes.GET_PLAYLISTS(categoryId)}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const data = await response.json();
  return data;
}

async function init() {
  const token = await getAccessToken();
  const category = await getCategory(token);
  console.log(category)
  const playlists = await getPlaylists(token, category.id);
  console.log(playlists);
}

app.listen(port, () => {
  console.log(`Tampulan api listening on port ${port}`)
  init();
})
