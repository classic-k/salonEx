import crypto, { randomBytes } from "crypto";
import bcrypt from "bcryptjs";

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
export const compareHash = (h1, h2) => {
  return bcrypt.compareSync(h1, h2);
};

export const hashStr = (str) => {
  return bcrypt.hashSync(str, 10);
};
export const chkSession = (req, res, next) => {
  if (req.session) console.log("Session is set");
  else console.log("Session not set");
  next();
};
