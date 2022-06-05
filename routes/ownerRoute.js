import express from "express";
import passport from "passport";
import { Register } from "../controller/auth/owner/index.js";
import { authOwner } from "../controller/auth/passport-config.js";
//import { RegSalon } from "../controller/salon/index.js";
import { RegOwner } from "../controller/auth/index.js";

const ownerRouter = express.Router();

ownerRouter.get("/login", (req, res) => {
  console.log(req.session.messages);
  if (req.session.messages) {
    let l = req.session.messages.length;
    const msg = req.session.messages[l - 1];
    //console.log(msg);
    return res.render("owner/login", { msg: msg });
  }
  res.render("owner/login");
});

ownerRouter.get("/register", (req, res) => {
  res.render("owner/register.ejs");
});

ownerRouter.get("/dash", (req, res) => {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.render("owner/dash");
});
ownerRouter.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
    failureRedirect: "/owner/login",
  }),
  (req, res) => {
    res.redirect("/owner/dash");
  }
);
ownerRouter.post("/register", RegOwner);

//ownerRouter.get("/addsalon", authOwner, RegSalon);

export default ownerRouter;
