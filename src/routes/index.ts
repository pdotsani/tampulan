import express from "express";
import routes from "../config/routes";
import { routeLogger } from '../logger';
import auth from '../auth';
import getTracks from "./getTracks";

const router = express.Router();

router.get(routes.GET_TRACKS, auth, routeLogger, getTracks);

export default router;
