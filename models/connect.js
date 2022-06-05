import mongoose from "mongoose";
import { Migrate } from "./sqlite/index.js";
export const SQLite = () => {
  try {
    Migrate();
    console.log("Migration done");
  } catch (err) {
    console.log(err);
    return;
  }
};

export const MDB = () => {
  mongoose
    .connect(process.env.MONGODB, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Done");
    })
    .catch((err) => {
      console.log(err);
    });
};
