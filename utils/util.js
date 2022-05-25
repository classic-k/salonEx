import crypto from "crypto";
export const encryptPassword = (password, salt) => {
  const hash = crypto.pbkdf2(password, salt, 310000, 32, "sha256");

  return hash, salt;
};
