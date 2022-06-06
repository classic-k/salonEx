import expressAsyncHandler from "express-async-handler";
import { reverse, loader, BatchReverse as BR } from "../map/index.js";
import { GetByMunicipal } from "../salon/index.js";

export const Reverse = expressAsyncHandler(async (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  const data = await reverse(lat, long);
  res.send({ data });
});

export const Loader = expressAsyncHandler(async (req, res) => {
  let url = req.query.url;
  // Use regex to vet URL inside util.js
  const data = await loader(url);
  res.send({ data });
});

export const BatchReverse = expressAsyncHandler(async (req, res) => {
  let city = req.body.city;
  const geos = await GetByMunicipal(city);
  const datas = await BR(geos);
  res.send({ datas });
});
