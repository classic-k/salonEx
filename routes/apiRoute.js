import express from "express";
import { Reverse, Loader } from "../controller/api/index.js";

const apiRouter = express.Router();

apiRouter.post("/location", Reverse);
apiRouter.get("/loader", Loader);

export default apiRouter;
