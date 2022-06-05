import LocalStrategy from "passport-local";
import User from "../../models/users/userModel.js";
import bcrypt from "bcryptjs";
import Owner from "../../models/users/ownerModel.js";
import { vetOwner, vetUser } from "../../models/sqlite/index.js";

export const init_passport = (passport) => {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, cb) => {
        try {
          const user = await User.findOne({ email: username });
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              if (req.body.tok && req.body.tok == "") {
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
      // console.log(user);
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
export const sqlPass = (passport) => {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, cb) => {
        const url = req.originalUrl;

        try {
          if (url.indexOf("owner") > 0) {
            console.log("Owner log");
            const owner = vetOwner(username, password);
            if (owner) {
              return cb(null, owner);
            }
            return cb(null, false);
          } else {
            //  console.log("User log");
            const user = vetUser(username, password);
            if (user) {
              return cb(null, user);
            }
            console.log("Ret", user);
            return cb(null, false);
          }
        } catch (err) {
          console.log(err);
          return cb(err);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    process.nextTick(() => {
      console.log(user);
      return cb(null, { id: user.id, username: user.email });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(() => cb(null, user));
  });
};
export const Auth_User = (req, res, next) => {
  console.log("user", req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  const url = req.baseUrl;
  if (url.indexOf("user") > 0) {
    return res.redirect("/user/login");
  } else if (url.indexOf("owner") > 0) {
    console.log("From auth");
    return res.redirect("/owner/login");
  } else {
    return res.redirect("/");
  }
};

export const IsOwner = async (req, res, next) => {
  const user = req.user;
  if (typeof user === "undefined") {
    console.log("User not defined");
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
