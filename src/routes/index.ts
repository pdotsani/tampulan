import express from "express";
import routes from "../config";
import { routeLogger } from '../logger';
import auth from '../auth';
import getTracks from "./getTracks";
import swap from "./swap";
import refresh from "./refresh";

const router = express.Router();

router.get(routes.GET_TRACKS, auth, routeLogger, getTracks);
router.post(routes.SWAP_ENDPOINT, routeLogger, swap);
router.post(routes.REFRESH_ENDPOINT, routeLogger, refresh);

export default router;
