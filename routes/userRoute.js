import express from "express";
import passport from "passport";
import { Register } from "../controller/auth/index.js";
import { Auth_User } from "../controller/auth/passport-config.js";

const userRouter = express.Router();

userRouter.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

userRouter.get("/register", (req, res) => {
  res.render("users/register.ejs");
});

userRouter.get("/dash", Auth_User, (req, res) => {
  res.send("Welcome to dashborad");
});
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/user/dash",
    failureMessage: "Invalid login credentials",
  })
);
userRouter.post("/register", Register);

export default userRouter;
