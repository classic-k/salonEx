import mongoose from "mongoose";

const users = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    city: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, required: false, default: "Nigeria" },
    phone: { type: String, required: true },
    //coordinate:{ type: String, required: false, unique: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", users);
export default User;
