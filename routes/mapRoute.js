//import { url_re } from "../controller/map/auth.js";
import express from "express";

const mapRouter = express.Router();

mapRouter.get("/", (req, res) => {
  res.render("maps/index.ejs");
});

export default mapRouter;
