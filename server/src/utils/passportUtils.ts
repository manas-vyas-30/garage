import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../models/User";

const genPassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return { salt, password: hash };
};

const validatePassword = (password: string, hash: string, salt: string) => {
  const incomingHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === incomingHash;
};

const issueJWT = (user: IUser) => {
  const id = user._id;
  const expiresIn = "1d";
  const payload = {
    sub: id,
    role: user.role,
    iat: Date.now(),
  };
  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET ?? "", {
    expiresIn,
    algorithm: "HS256",
  });
  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
};

const passportUtils = {
  validatePassword,
  genPassword,
  issueJWT,
};

export default passportUtils;
