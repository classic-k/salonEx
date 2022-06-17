import express from "express";
import { Reverse, Loader, RS, BatchReverse } from "../controller/api/index.js";

const apiRouter = express.Router();

apiRouter.post("/location", Reverse);
apiRouter.get("/loader", Loader);
apiRouter.get("/loader/search", RS);
apiRouter.get("salon/location", BatchReverse);
apiRouter.get("book/loc", RS);

export default apiRouter;
