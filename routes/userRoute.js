import express from "express";
import passport from "passport";
import { Register } from "../controller/auth/index.js";
import { Auth_User } from "../controller/auth/passport-config.js";
import { query } from "express";

const userRouter = express.Router();

userRouter.get("/login", (req, res) => {
  if (req.session.messages) {
    let l = req.session.messages.length - 1;
    let msg = req.session.messages[l];
    return res.render("users/login.ejs", { msg: msg });
  } else {
    return res.render("users/login.ejs");
  }
});

userRouter.get("/logout", (req, res) => {
  if (req.logOut || req.user) {
    req.logOut();
    return res.redirect("/", { msg: msg });
  }
  return res.redirect("/");
});

userRouter.get("/register", (req, res) => {
  res.render("users/register.ejs");
});

userRouter.get("/miscel", (req, res) => {
  query();
  res.send("Done");
});

userRouter.get("/dash", Auth_User, (req, res) => {
  res.send("Welcome to dashborad");
});

userRouter.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "Invalid credential",
    failWithError: false,
    failureRedirect: "/user/login",
  }),
  (req, res) => {
    res.redirect(302, "/user/dash");
  }
);

userRouter.post("/register", Register);

export default userRouter;
