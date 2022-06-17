import LocalStrategy from "passport-local";
import User from "../../models/users/userModel.js";
import { compareHash, hashStr } from "../../utils/util.js";
import Owner from "../../models/users/ownerModel.js";
import bcrypt from "bcryptjs";

export const init_passport = (passport) => {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, cb) => {
        try {
          const url = req.originalUrl.toLowerCase();
          const user = await User.findOne({ email: username });

          if (user) {
            if (compareHash(password, user.password)) {
              if (url.indexOf("owner") > 0) {
                const owner = await Owner.findOne({ user: user });
                if (owner) {
                  return cb(null, {
                    owner: owner.id,
                    username: user.email,
                    id: user.id,
                  });
                }
                return cb(null, false);
              }

              return cb(null, user);
            }
          }

          return cb(null, false, { message: "Invalid username or password" });
        } catch (err) {
          return cb(err, false, { message: "An error occur" });
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      if (typeof user.owner !== "undefined") {
        return cb(null, {
          id: user.id,
          username: user.username,
          owner: user.owner,
        });
      }
      return cb(null, { id: user.id, username: user.email });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(() => cb(null, user));
  });
};

export const Auth_User = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  const url = req.baseUrl;
  if (url.indexOf("user") >= 0) {
    return res.redirect("/user/login");
  } else if (url.indexOf("owner") >= 0) {
    return res.redirect("/owner/login");
  } else {
    return res.redirect("/");
  }
};

export const IsOwner = async (req, res, next) => {
  const user = req.user;
  if (typeof user === "undefined") {
    if (req.logOut) req.logOut();
    return res.redirect("/");
  } else {
    const ID = user.owner;

    const owner = await Owner.findOne({ id: ID });
    if (owner) {
      return next();
    }

    req.logOut();
    return res.redirect("/");
  }
};

export const authOwner = [Auth_User, IsOwner];
