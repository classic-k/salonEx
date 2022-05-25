import LocalStrategy from "passport-local";
import User from "../../models/users/userModel.js";
import { encryptPassword } from "../../utils/util.js";
import bcrypt from "bcryptjs";

export const init_passport = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      const user = await User.findone({ email: username });
      if (user) {
        try {
          //const hashedPassword = encryptPassword(password, user.salt);
          if (bcrypt.compareSync(password, user.password)) {
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

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const userId = await User.findOne({ where: { id: id } });
    try {
      return done(null, userId);
    } catch (err) {
      return done(err);
    }
  });
};

export const Auth_User = (req, res, next) => {
  if ((req.isAutheb = nticated())) {
    return next();
  }
  return res.redirect("/login");
};
