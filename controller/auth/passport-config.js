import LocalStrategy from "passport-local";
import User from "../../models/users/userModel.js";
import bcrypt from "bcryptjs";
import Owner from "../../models/users/ownerModel.js";

export const init_passport = (passport) => {
  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      async (req, username, password, cb) => {
        // console.log(username, password);
        const user = await User.findOne({ email: username });

        if (user) {
          try {
            //const hashedPassword = encryptPassword(password, user.salt);
            if (!bcrypt.compareSync(password, user.password)) {
              return cb(null, false, {
                message: "Invalid username or password",
              });
            }

            if (req.body.tok) {
              const tok = req.body.tok;
              if (tok == "AIzaSyA8") {
                const owner = await Owner.findOne({ user: user });
                if (owner) {
                  return cb(
                    null,
                    {
                      username: user.email,
                      owner: owner.id,
                      id: user.id,
                    },
                    { message: "Successful" }
                  );
                } else
                  return cb(null, false, {
                    message: "Invalid username or password",
                  });
              }
            }
            return cb(null, user, { message: "Successful" });
          } catch (err) {
            return cb(err, false, { message: "An error occur" });
          }
        } else {
          return cb(null, false, { message: "Invalid username or password" });
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
  console.log(user);
  if (typeof user.owner !== "undefined") {
    const ID = user.owner;

    const owner = await Owner.findOne({ id: ID });
    if (owner) {
      return next();
    }

    req.logout();
    return res.redirect("/");
  }
  console.log("From own");
  return res.redirect("/owner/login");
};

export const authOwner = [Auth_User, IsOwner];
