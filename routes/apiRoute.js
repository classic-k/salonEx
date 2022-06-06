import express from "express";
import { reverse } from "../controller/api/index.js";

const apiRouter = express.Router();

apiRouter.post("/location", reverse);

export default apiRouter;
