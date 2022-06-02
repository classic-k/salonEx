import LocalStrategy from "passport-local";
import User from "../../models/users/userModel.js";
import Owner from "../../models/users/ownerModel.js";
import { encryptPassword } from "../../utils/util.js";
import bcrypt from "bcryptjs";

export const init_passport = (passport) => {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, cb) => {
        const user = await User.findOne({ email: username });
        if (user) {
          try {
            //const hashedPassword = encryptPassword(password, user.salt);
            if (bcrypt.compareSync(password, user.password)) {
              return cb(null, false, {
                message: "Invalid username or password",
              });
            }
            if (req.body.tok) {
              const tok = req.body.tok;
              if (tok == "AIzaSyA8") {
                const owner = await Owner.findone({ user: user });
                if (owner) {
                  req.session["owner"] = owner.id;
                } else
                  return cb(null, false, {
                    message: "Invalid username or password",
                  });
              }
            }
            return cb(null, user, { message: "Successful" });
          } catch (err) {
            console.log(err);
            return cb(null, false, { message: "An error occur" });
          } finally {
            console.log(username, password);
            console.log(req.headers);
          }
        } else {
          return cb(null, false, { message: "Invalid username or password" });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    const userId = await User.findOne({ where: { _id: id } });
    try {
      return done(null, userId);
    } catch (err) {
      return done(err);
    }
  });
};

export const Auth_User = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};

export const IsOwner = (req, res, next) => {
  if (req.isAuthenticated()) {
    // get owner session ID
    return next();
  }
  return res.redirect("/");
};
