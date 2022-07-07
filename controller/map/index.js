import axios from "axios";
import { endpoints } from "../../utils/constants.js";
import { vetLoader } from "../../utils/util.js";

export const batchReverse = async (datas) => {
  // let query = "&query=" + datas;
  let url = endpoints.postSyncBR;
  url = url + process.env.MAPKEY; //+ query;
  const res = await axios({ method: "post", url: url, data: datas });
  return res.data;
};
export const address = async (addr) => {
  let url = endpoints.address;
  url = url + process.env.MAPKEY; //+ query;
  url = url + "&query=" + addr;
  const res = await axios({ method: "get", url: url });
  return res.data;
};
export const reverse = async (lat, long) => {
  let query = "&query=" + long + "," + lat;
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
  const data = datas.data.addresses[0];
  return data.address;
};

export const direction = async (coordinate) => {
  query = coordinate[0].join("") + ":" + coordinate[1].join("");
  let url = endpoints.routeDR + process.end.MAPKEY;
  url = url + "&query=" + query;
  const data = await axios.get(url);
  const res = data.data;
  return res;
};

export const directionB = async (origin, datasets) => {
  const result = [];
  for (var i = 0; i < datasets.length; i++) {
    var src = datasets[i].geometry.coordinates;
    var query = origin[1] + "," + origin[0] + ":" + src[1] + "," + src[0];
    //query = encodeURI(query)

    let url = endpoints.routeDR + process.env.MAPKEY;
    url = url + "&query=" + query.trim();
    url = encodeURI(url);
    // console.log(url);
    const data = await axios.get(url);

    result.push(data.data);
  }

  return result;
};

export const polygon = async (geometry) => {
  let url = endpoints.polygon;
  url = url + process.env.MAPKEY;
  url = url + "&geometries=" + geometry;

  const res = await axios.get(url);
  ///console.log(res.data);
  return res.data;
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

export const getGeo = (datas) => {
  const addresses = datas.addresses;
  const geometries = addresses.map((val) => val.dataSources.geometry.id);
  return geometries.join(",");
};

export const makeFeatures = (salons) => {
  const features = [];
  salons.forEach((salon) => {
    const props = Object.keys(salon).filter((val) => val != "coordinate");
    const cus = {};
    props.forEach((val) => {
      cus[val] = salon.val;
    });
    features.push(
      new atlas.features(new atlas.data.pos(salon["coordinate"], cus))
    );
  });
  return features;
};
