import axios from "axios";
import { endpoints } from "../../utils/constants.js";
import { vetLoader } from "../../utils/util.js";

export const BatchReverse = async (datas) => {
  let query = "&query=" + datas;
  let url = endpoints.batchReverse;
  url = url + process.env.MAPKEY + query;
  const res = await axios.get(url);
  return res;
};

export const reverse = async (lat, long) => {
  let query = "&query=" + lat + "," + long;
  let url = endpoints.reverse;
  url = url + process.env.MAPKEY;
  url = url + query;
  const datas = await axios.get(url);

  /*
  console.log(datas.data.addresses);
  const address = datas.data.addresses[0];
  const data = {
    address: address.freeformAddress,
    city: address.municipality,
    localName: address.localName,
  };
*/
  // console.log(datas.data.geojson.getFeatures());
  const data = datas.data;
  return data;
};
export const polygon = (geometry) => {
  let url = endpoints.polygon;
  url = url + process.env.MAPKEY;
  url = url + "&geometries=" + geometry;

  const res = axios.get(url);
  return res;
  // const data = res.data.additionalData.providerID.geometryData.features;
  // return data;
};
export const loader = async (req, url) => {
  url = vetLoader(url);
  const headers = {};
  const hea = req["headers"];
  let responseType = "stream";
  headers["accept"] = hea["accept"];
  if (hea["session-id"]) {
    headers["session-id"] = hea["session-id"];
  }
  if (hea["if-none-match"]) {
    headers["if-none-match"] = hea["if-none-match"];
  }

  let acc = headers["accept"];
  acc = acc.toLowerCase();

  if (
    acc.indexOf("json") >= 0 ||
    acc.indexOf("text") >= 0 ||
    acc.indexOf("html") >= 0 ||
    acc.indexOf("javascript") >= 0
  ) {
    responseType = "json";
  }

  const res = await axios({
    url,
    headers,
    responseType,
  });
  // console.log(res);
  return res;
};
