import LocalStrategy from "passport-local";
import User from "../../models/userModel.js";
import crypto from "crypto";

export const init_passport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      const user = await User.findone({ username: username });
      if (user) {
        try {
          const hashpassword = crypto.pbkdf2(
            password,
            user.salt,
            310000,
            32,
            "sha256"
          );
          if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
            return cb(null, false, { message: "Invalid username or password" });
          }
          return cb(null, user);
        } catch (err) {
          console.log(err);
          return cb(null, false, { message: "An error occur" });
        }
      } else {
        return cb(null, false, { message: "Invalid username or password" });
      }
    })
  );
};

export const Auth_User = (req, res, next) => {
  if ((req.isAutheb = nticated())) {
    return next();
  }
  return res.redirect("/login");
};
