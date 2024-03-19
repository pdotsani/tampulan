import winston, { format } from 'winston';

const logFormat = format.printf(({ timestamp, level, message, service }) => {
  return `${timestamp} ${level}: [${service}] - ${message}`;
});

export default {
  init: () => {
    return winston.createLogger({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.prettyPrint(),
        logFormat,
      ),
      defaultMeta: { service: 'tampulan-api' },
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
          filename: 'combined.log',
          level: 'info',
        }),
      ],
    });
  }
}

export { routeLogger } from './route';
