import expressAsyncHandler from "express-async-handler";
import Salon from "../../models/salon/salonModel.js";

export const RegSalon = expressAsyncHandler(async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let lat = req.body.lat;
  let lon = req.body.lon;
  let phone = req.body.phone;
  let sex = req.body.sex;
  sex = parseInt(sex);
  let owner = req.owner;
  let desc = req.body.desc;
  let city = req.body.city;
  let pos = [lat, lon];
  try {
    const salon = new Salon({
      name: name,
      email: email,
      description: desc,
      admin: owner,
      phone: phone,
      sex: sex,
      coordinate: pos,
      city: city,
    });
    const ns = await salon.save();
    if (ns) {
      console.log("Save successful");
      res.status(201).send({ msg: "success", name: ns.name });
      return;
    }
    res.status(500).send({ msg: "An error occur try later" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "An error occur try later" });
  }
});

export const GetByMunicipal = async (city) => {
  const salons = await Salon.find({ city: city });
  // prepare geos base on batch query format
  const geos = [];
  if (salons) {
    for (const salon in salons) {
      geos.push(salon.pos);
    }
  }

  return geos;
};
