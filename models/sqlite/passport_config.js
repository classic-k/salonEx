import { vetOwner, vetUser } from "../../models/sqlite/index.js";
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
