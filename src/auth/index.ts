import logger from '../logger';

const log = logger.init();

export default function(req, res, next) {
  if (process.env.APP_ID_KEY === req.get('Authorization')) {
    next();
  } else {
    log.error(`Unauthorized request from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
    res.status(403).send('Unauthorized')
  }
}
