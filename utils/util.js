import crypto, { randomBytes } from "crypto";
import msal from "@azure/msal-node";

const connect = new msal.ConfidentialClientApplication({
  auth: {
    clientId: process.env.MSALCID,
    authority: process.env.MSALAUTH,
    clientSecret: process.env.MSALSEC,
  },
  system: {
    loggerOptions: {
      loggerCallback: (loglevel, message, containsPii) => {},
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
});

export const getToken = async () => {
  let token;
  const tokenreq = {
    scopes: ["https://atlas.microsoft.com/.default"],
  };
  let res = await connect.acquireTokenByClientCredential(tokenreq);
  token = res.accessToken;
  return token;
};

export const encryptPassword = (password, salt) => {
  if (salt) salt = new Buffer(salt);
  else salt = randomBytes(16);
  const arr = [];
  password = new Buffer(password);
  crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hash) => {
    if (!err) {
      arr.push(hash.toString("hex"));
      arr.push(salt.toString("hex"));
      console.log(arr);
      return arr;
    }
  });
  return arr;
};

export const chkSession = (req, res, next) => {
  if (req.session) console.log("Session is set");
  else console.log("Session not set");
  next();
};
