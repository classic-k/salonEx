import expressAsyncHandler from "express-async-handler";
import User from "../../models/users/userModel.js";
import Booking from "../../models/books/bookModel.js";
import { hashStr } from "../../utils/util.js";

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
  res.status(201).send({ message: "Registration successful" });
  console.log("Registration");
});
export const fetchCity = async (user) => {
  const users = await User.findById(user);
  if (users) return users.city;
  return;
};
export const Book = expressAsyncHandler(async (req, res, next) => {
  const salon = req.body.salon;
  const type = req.body.type; //
  const schedule = req.body.schedule;
  const user = req.user.id;
  const description = req.body.desc;

  const book = new Booking({
    salon,
    user,
    schedule,
    description,
  });

  const details = await book.save();
  res.send({ details });
});
