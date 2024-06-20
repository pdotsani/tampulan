import logger from '../../logger';
import { RereshTokenResponse } from '../../types';
import { decrypt, encrypt } from '../../utils';

const log = logger.init();

export default async (req, res) => {

  const refreshToken = decrypt(req.body.refresh_token);

  const reqdData = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  };

  const response = await fetch(
    process.env.SPOTIFY_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.SPOTIFY_CLIENT_ID+':'+process.env.SPOTIFY_CLIENT_SECRET).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(reqdData),
  });

  const data = await response.json() as RereshTokenResponse;

  if (data.refresh_token) {
    data.refresh_token = encrypt(data.refresh_token)
  }

  res.status(response).json(data);

  log.info(`Request access and refresh tokens`);
};
