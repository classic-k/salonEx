import expressAsyncHandler from "express-async-handler";
import { endpoints } from "../../utils/constants.js";
import axios from "axios";

export const reverse = expressAsyncHandler(async (req, res) => {
  const lat = req.body.lat;
  const long = req.body.long;
  let query = "&query=" + lat + "," + long;
  console.log(query);
  let url = endpoints.reverse;
  url = url + process.env.MAPKEY;
  url = url + query;
  console.log(url);
  const datas = await axios.get(url);
  console.log(datas.data.addresses);

  // const locs = await data.json();
  res.send({ datas: datas.data.addresses });
});
