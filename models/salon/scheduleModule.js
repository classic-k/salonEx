import mongoose from "mongoose";
import Salon from "./salonModel.js";

const schedule = new mongoose.Schema(
  {
    day: { type: String, required: true }, // days of the week
    opening: { type: String, required: true, unique: true }, // in 24 hours format
    closing: { type: String, required: true }, // 24 hours format
    salon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Salon,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
const Schedule = mongoose.model("Schedule", schedule);
export default Schedule;
