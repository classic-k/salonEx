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
    return res.render("owner/login", { msg: msg });
  }
  res.render("owner/login");
});

ownerRouter.get("/register", (req, res) => {
  res.render("owner/register.ejs");
});
ownerRouter.post("/register", Register);
ownerRouter.get("/dash", authOwner, (req, res) => {
  res.render("owner/dash");
});
ownerRouter.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "Invalid credentials",
    failureRedirect: "/owner/login",
  }),
  (req, res) => {
    console.log(req.isAuthenticated());
    res.redirect("/owner/dash");
  }
);
ownerRouter.get("/logout", (req, res, next) => {
  if (req.isAuthenticated() || req.logOut) {
    req.logOut();
  }
  res.redirect("/");
});
ownerRouter.get("/addsalon", authOwner, (req, res) => {
  res.render("salon/register");
});

ownerRouter.post("/addsalon", authOwner, RegSalon);

export default ownerRouter;
