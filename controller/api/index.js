import expressAsyncHandler from "express-async-handler";
import {
  reverse,
  loader,
  polygon,
  batchReverse as BR,
  getGeo,
} from "../map/index.js";
import { GetByMunicipal } from "../salon/index.js";
import fs from "fs";
import { Readable } from "stream";
import buffer, { Buffer } from "buffer";

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
  const geo = getGeo(data);
  polygon(geo)
    .then((resp) => {
      const addD = resp.data.additionalData[0];
      const result = addD.geometryData.features;
      console.log(result);
      res.send({ result });
    })
    .catch((err) => {
      console.log(err.message);
    });
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
  let city = req.body.city;
  const geos = await GetByMunicipal(city);
  const datas = await BR(geos);
  res.send({ datas });
});
