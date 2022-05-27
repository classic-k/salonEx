import express from "express";
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { init_passport, Auth_User } from "./controller/auth/passport-config.js";
import userRouter from "./routes/userRoute.js";

const app = express();
init_passport(passport);

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

app.set("views", "public");
app.set("view engine", "ejb");
try {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB,
        collectionName: "sessions",
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 60000 * 60 * 24 },
    })
  );
} catch (err) {
  console.log("Police");
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("Welcome to home land");
});
app.use("/user", userRouter);
app.listen(5000, () => {
  console.log("Loaded");
});
