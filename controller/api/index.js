import expressAsyncHandler from "express-async-handler";
import {
  reverse,
  loader,
  polygon,
  batchReverse as BR,
  getGeo,
} from "../map/index.js";
import { GetByMunicipal } from "../salon/index.js";
import { fetchCity } from "../auth/index.js";

export const Reverse = expressAsyncHandler(async (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  const data = await reverse(lat, long);
  res.send({ data });
});

export const RS = expressAsyncHandler(async (req, res) => {
  const pos = req.query.pos;

  const c = pos.trim().split(",");
  const data = await reverse(c[0], c[1]);
  // console.log(data.addresses[0].address);
  const city = data.addresses[0].address.municipality;
  const geo = getGeo(data);
  const resp = await polygon(geo);
  const bbox = data.addresses[0].address.boundingBox;
  const addD = resp.additionalData[0];
  const result = addD.geometryData.features;
  // console.log(result);
  res.send({ result, city, bbox });
});

export const Loader = (req, res) => {
  let furl = req.originalUrl;
  furl = furl.trim();
  let ind = furl.indexOf("url=");
  let url = furl.slice(ind + 4);
  // Use regex to vet URL inside util.js
  // const response =
  loader(req, url)
    .then((response) => {
      res["headers"] = response.headers;
      // console.log(url, res["headers"]["content-type"]);
      const ct = response.headers["content-type"];

      if (response.statusText !== "OK") {
        console.log("Bad request", response.status);
        return res.status(500).send({ message: "An error occur try again" });
      }
      if (
        ct.indexOf("json") >= 0 ||
        ct.indexOf("html") >= 0 ||
        ct.indexOf("text") >= 0
      ) {
        const data = response.data;
        // console.log(data);
        return res.send(data);
      }
      const data = response.data;

      data.pipe(res);
      return;
    })
    .catch((err) => {
      console.log("Bad req", url, err.message);
      res.status(500).send({ message: "An error occur try again" });
    });
};

export const BatchReverse = expressAsyncHandler(async (req, res) => {
  const user = req.user.id;
  const city = fetchCity(user);
  const geos = await GetByMunicipal(city);

  const datas = await BR(geos);
  res.send({ datas });
});

export const BookReverse = expressAsyncHandler(async (req, res) => {
  const user = req.user.id;
});
