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
  console.log(datas.data.addresses);
  const address = datas.data.addresses[0];
  const data = {
    address: address.freeformAddress,
    city: address.municipality,
    localName: address.localName,
  };

  return data;
};

export const loader = async (url) => {
  url = vetLoader(url);
  if (!url) {
    return false;
  }
  const data = await axios.get(url);
  return data;
};
