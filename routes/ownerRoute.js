import express from "express";
import passport from "passport";
import { Register } from "../controller/auth/owner/index.js";
import { authOwner } from "../controller/auth/passport-config.js";
import { RegSalon } from "../controller/salon/index.js";

const ownerRouter = express.Router();

ownerRouter.get("/login", (req, res) => {
  if (req.session.messages) {
    let l = req.session.messages.length;
    const msg = req.session.messages[l - 1];
    console.log(msg);
    res.render("owner/login", { msg: msg });
    return;
  }
  res.render("owner/login");
});

ownerRouter.get("/register", (req, res) => {
  res.render("owner/register.ejs");
});

ownerRouter.get("/dash", authOwner[0], (req, res) => {
  res.send("Welcome to owner dashborad");
});
ownerRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/owner/dash",
    failureMessage: "Invalid login credentials",
    failureRedirect: "/owner/login",
  })
);
ownerRouter.post("/register", Register);

ownerRouter.get("/addsalon", authOwner, RegSalon);

export default ownerRouter;
