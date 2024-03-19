import logger from './index';

const log = logger.init();

export const routeLogger = (req, _res, next) => {
  log.info(`${req.method} - ${req.originalUrl} - ${req.headers['x-forwarded-for'] || req.socket.remoteAddress} - ${req.get('User-Agent')}`);
  next();
}