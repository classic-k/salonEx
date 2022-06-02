import { url_re } from "../controller/map/auth.js";
import express from "express";

const mapRouter = express.Router();

router.get("/", (req, res) => {
  const token = url_re();
});

export default mapRouter;
