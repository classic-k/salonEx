import mongoose from "mongoose";
import Owner from "../users/ownerModel.js";

const salons = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    locName: { type: String, required: false },
    country: { type: String, required: true, default: "Nigeria" },
    coordinate: { type: Array, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    sex: { type: String, required: true },
    notes: { type: String, required: false }, //Schedule note e.g no opening on public holidays etc
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
