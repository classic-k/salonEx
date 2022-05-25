import LocalStrategy from "passport-local";
import User from "../../models/userModel.js";
import { encryptPassword } from "../../utils/util.js";

export const init_passport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      const user = await User.findone({ username: username });
      if (user) {
        try {
          const hashedPassword = encryptPassword(password, user.salt);
          if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
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
