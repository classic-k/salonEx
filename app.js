import express from "express";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
const app = express();

mongoose.connect(process.env.MONGODB, { seNewUrlParser: true }).then(() => {
  console.log("Mongoose connected");
});
app.listen(5000, () => {
  console.log("Loaded");
});
