import expressAsyncHandler from "express-async-handler";
import User from "../../models/users/userModel.js";
import bcrypt from "bcryptjs";
import {
  createUser,
  createOwner,
  vetUser,
  vetOwner,
} from "../../models/sqlite/index.js";

export const Register = expressAsyncHandler(async (req, res, next) => {
  let fname = req.body.firstname;
  let lname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let sex = req.body.sex;

  password = bcrypt.hashSync(password, 10);

  const mail_exists = await User.findOne({ email: req.body.email });
  if (mail_exists) {
    res.send({ message: "Email exists" });
    return;
  }

  const user = new User({
    firstname: fname,
    lastname: lname,
    email: email,
    password: password,
    phone: phone,

    sex: sex,
  });
  await user.save();
  res.status(201).send({ message: "Registration successful" });
  console.log("Registration");
});

export const RegUser = expressAsyncHandler(async (req, res, next) => {
  let fname = req.body.firstname;
  let lname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let sex = req.body.sex;

  password = bcrypt.hashSync(password, 10);

  createUser(email, password, fname, lname, phone, sex);
  res.status(201).send({ message: "Registration successful" });
  console.log("Registration");
});

export const RegOwner = expressAsyncHandler(async (req, res, next) => {
  let fname = req.body.firstname;
  let lname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let sex = req.body.sex;
  let brand = req.body.brand;
  let addr = req.body.address;
  let site = req.body.website;

  password = bcrypt.hashSync(password, 10);

  createOwner(email, password, fname, lname, phone, sex, brand, addr, site);
  res.status(201).send({ message: "Registration successful" });
  console.log("Registration");
});
