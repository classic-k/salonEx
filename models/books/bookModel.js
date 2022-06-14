import mongoose from "mongoose";
import User from "../users/userModel.js";
import Salon from "../salon/salonModel.js";

const booking = new mongoose.Schema(
  {
    fulfilled: { type: Boolean, required: true, default: false },
    coordinate: { type: Map, required: true },
    schedule: { type: String, required: true },
    description: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
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
const Booking = mongoose.model("Booking", booking);
export default Booking;
