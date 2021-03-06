import express from "express";
import session, { MemoryStore } from "express-session";
import "dotenv/config";
import cookieParser from "cookie-parser";
import passport from "passport";
import { init_passport } from "./controller/auth/passport-config.js";
import userRouter from "./routes/userRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import apiRouter from "./routes/apiRoute.js";
import mapRouter from "./routes/mapRoute.js";
import { MDB as DB } from "./models/connect.js";

const app = express();

init_passport(passport);
DB();

try {
  app.use(
    session({
      store: new MemoryStore(),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 60000 * 60 * 24 },
    })
  );
} catch (err) {
  console.log("Police");
}
app.disable("x-powered-by");
app.set("views", "public");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.use("/api", apiRouter);
app.use("/user", userRouter);
app.use("/owner", ownerRouter);
app.use("/map", mapRouter);
app.listen(5000, () => {
  console.log("Loaded");
});
