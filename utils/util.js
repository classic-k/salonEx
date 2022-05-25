import crypto, { randomBytes } from "crypto";
//import { Buffer } from "buffer";
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
