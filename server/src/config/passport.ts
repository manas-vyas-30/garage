import { PassportStatic } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/User";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithm: ["HS256"],
};

const strategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.sub });
    if (user) done(null, user);
    else done(null, false);
  } catch (error) {
    done(error, false);
  }
});

module.exports = (passport: PassportStatic) => {
  passport.use(strategy);
};
