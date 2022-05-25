import express from "express";
import passport from "passport";
import { Register } from "../controller/auth/index.js";

const userRouter = express.Router();
/*
userRouter.get("/login", (req, res) => {
  res.render("users/login.html");
});

userRouter.get("/register", (req, res) => {
  res.render("users/register");
});
*/
userRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "",
    failureMessage: "Invalid login credentials",
  })
);
userRouter.post("/register", Register);

export default userRouter;
