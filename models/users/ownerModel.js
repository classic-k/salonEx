import mongoose from "mongoose";
import User from "./userModel.js";

const owner = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: User, required: true },
  brand: { type: String, required: true },
  headquarter: { type: String, required: true, default: "Headquarter" },
  website: { type: String, required: false },
});

const Owner = mongoose.model("Owner", owner);

export default Owner;
