import express from "express";
import {
  Reverse,
  Loader,
  RS,
  BatchReverse,
  SalonFetch,
  DirectionBR,
} from "../controller/api/index.js";

const apiRouter = express.Router();

apiRouter.post("/location", Reverse);
apiRouter.get("/loader", Loader);
apiRouter.get("/loader/search", RS);
apiRouter.post("/routeB/calculate", DirectionBR);
//apiRouter.get("salon/location", BatchReverse);
apiRouter.get("salon/location", BatchReverse);
apiRouter.get("/salons/location", SalonFetch);
apiRouter.get("book/loc", RS);

export default apiRouter;
