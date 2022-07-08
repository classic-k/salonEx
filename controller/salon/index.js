//import atlas, { data } from "azure-maps-control";
import expressAsyncHandler from "express-async-handler";
import Salon from "../../models/salon/salonModel.js";
import Schedule from "../../models/salon/scheduleModule.js";

const headers = "name phone coordinates address description sex city";
export const RegSalon = expressAsyncHandler(async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let lat = req.body.lat;
  let lon = req.body.lon;
  let phone = req.body.phone;
  let sex = req.body.sex;
  let address = req.body.address;
  let owner = req.user.owner;
  let desc = req.body.desc;
  let city = req.body.city;
  let pos;

  if (lat && lon) {
    pos = [lon, lat];
  } else if (req.body.coordinate) {
    pos = req.body.coordinate;
    pos = pos.trim().split(",");
  }
  let ln = req.body.locName;
  //console.log(owner);
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
      locName: ln,
      address: address,
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

//export const Salons = expressAsyncHandler(async (req, res, next) => {});

export const getByMunicipal = async (city) => {
  const salons = await Salon.find({ city: city }, headers);
  // console.log(salons);
  const datas = extractData(salons);
  return datas;

  // prepare geos base on batch query format

  /*
  const geos = [];
  if (salons) {
    for (const salon in salons) {
      let pos = salon.coordinate;
      let query = "?query=" + pos.join(",");
      geos.push({ query });
    }
  }

  return { batchItems: geos }; */
};

export const getByOwner = async (req, res, next) => {
  const owner = req.user.owner;
  if (!owner) {
    next("error");
    return;
  }
  const salons = await Salon.find({ owner: owner });
  req.salons = salons;
  next();
};

export const sexFilter = (sex, salon) => {
  const salons = salon.filter((val) => val.sex === sex || val.sex == 0);
  return salons;
};

export const extractData = (salons) => {
  const datas = salons.map((val) => {
    return {
      name: val.name,
      address: val.address,
      phone: val.phone,
      coordinate: [
        parseFloat(val.coordinate[1]),
        parseFloat(val.coordinate[0]),
      ],
      sex: val.sex,
      city: val.city,
      id: val.id,
      schedules: fetchSch(val.id),
    };
  });

  // console.log(datas);
  return datas;
};
export const fetchSch = async (salon) => {
  const schedules = await Schedule.find({ salon: salon });

  return schExtract(schedules);
};
export const fetchByLoc = async (loc) => {
  // regex
  const res = await Salon.find(
    {
      $or: [
        { city: { $regex: loc } },
        { locName: { $regex: loc } },
        { address: { $regex: loc } },
      ],
    },
    headers
  );

  return res;
};

export const fetchBySexLoc = async (sex, loc) => {
  var res = await fetchByLoc(loc);
  if (sex) {
    res = sexFilter(sex, res);
  }
  return res;
};
export const schExtract = (schedules) => {
  const datas = schedules.map((val) => {
    let day = val.day;
    return { day: [val.opening, val.closing] };
  });
  return datas;
};
