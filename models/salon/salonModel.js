import mongoose from "mongoose";
import Owner from "./ownerModel";

const salons = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true, default: "Nigeria" },
    coordinate: { type: Map, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    sex: { type: int, required: true },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Owner,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Salon = mongoose.model("Salon", salons);
export default Salon;
