import logger from '../../logger';
import { RereshTokenResponse } from '../../types';
import { encrypt } from '../../utils';

const log = logger.init();

export default async (req, res) => {

  const reqdData = {
    grant_type: 'authorization_code',
    redirect_uri: process.env.SPOTIFY_CLIENT_CALLBACK,
    code: req.body.code
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

  log.info(`Request access and swap tokens`);
}
