//import { url_re } from "../controller/map/auth.js";
import express from "express";

const mapRouter = express.Router();

mapRouter.get("/", (req, res) => {
  res.render("maps/index.ejs");
});

mapRouter.get("/locator", (req, res) => {
  res.render("miscel/locator.ejs");
});

export default mapRouter;
