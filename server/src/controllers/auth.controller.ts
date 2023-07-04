import { RequestHandler } from "express";
import authService from "../services/auth.service";
import passportUtils from "../utils/passportUtils";

const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await authService.findUserByEmail(req.body.email);
    if (data)
      return res
        .status(401)
        .json({ success: false, msg: "User already exists!" });
    const saltHash = passportUtils.genPassword(req.body.password);
    const user = await authService.registerUser(
      req.body,
      saltHash.salt,
      saltHash.password,
    );
    if (user) {
      const jwt = passportUtils.issueJWT(user);
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          number: user.number,
        },
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    } else {
      res.json({ success: false, msg: "Unable to register user" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const logInUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await authService.findUserByEmail(req.body.email);
    if (!user)
      return res.status(401).json({ success: false, msg: "User not found" });
    const isValid = passportUtils.validatePassword(
      req.body.password,
      user.password,
      user.salt,
    );
    if (isValid) {
      const tokenObj = passportUtils.issueJWT(user);
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          number: user.number,
        },
        token: tokenObj.token,
        expiresIn: tokenObj.expires,
      });
    } else {
      res.status(401).json({ success: false, msg: "Enter valid password" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const protectedRoute: RequestHandler = (req, res, next) => {
  try {
    res.status(200).json({ success: true, msg: "Authenticated!" });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const authController = {
  registerUser,
  logInUser,
  protectedRoute,
};

export default authController;
