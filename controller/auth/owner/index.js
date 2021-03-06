import expressAsyncHandler from "express-async-handler";
import User from "../../../models/users/userModel.js";
import Owner from "../../../models/users/ownerModel.js";
import { hashStr } from "../../../utils/util.js";

export const Register = expressAsyncHandler(async (req, res, next) => {
  let fname = req.body.firstname;
  let lname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let sex = req.body.sex;

  password = hashStr(password);

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

  const brand = req.body.brand;
  const address = req.body.address;

  const owner = new Owner({
    user: user,
    brand: brand,
    headquarter: address,
  });

  await owner.save();
  res
    .status(201)
    .send({ message: "Registration successful Go add salon details" });
  console.log("Registration");
});
