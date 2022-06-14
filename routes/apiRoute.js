import express from "express";
import { Reverse, Loader, RS } from "../controller/api/index.js";

const apiRouter = express.Router();

apiRouter.post("/location", Reverse);
apiRouter.get("/loader", Loader);
apiRouter.get("/loader/search", RS);

export default apiRouter;
