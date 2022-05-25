import mongoose from "mongoose";

const users = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },

    sex: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", users);
export default User;
