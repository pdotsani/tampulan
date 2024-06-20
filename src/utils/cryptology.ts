import crypto from 'crypto';
import config from '../config';

const algorhitm = config.CRYPTO_ALGORITHIM;
const key = config.CRYPTO_KEY;
const iv = config.CRYPTO_IV;

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorhitm, key, iv);
	let encrypted = cipher.update(text, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
};

const decrypt = (text) => {
  const cipher = crypto.createDecipheriv(algorhitm, key, iv);
  let decrypted = cipher.update(text, 'hex', 'utf8');
  decrypted += cipher.final('utf8');
  return decrypted;
}

export {
  encrypt,
  decrypt
};
