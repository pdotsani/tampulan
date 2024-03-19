import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import logger from './logger';
import routes from './config/routes';
import router from './routes';

dotenv.config();

const app = express();
const PORT = routes.PORT;

const log = logger.init();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, async () => {
  log.info(`Tampulan api listening on port ${PORT}`);
});
