import { RequestHandler } from "express";
import userService from "../services/user.service";
import passportUtils from "../utils/passportUtils";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    if (user)
      return res
        .status(400)
        .json({ success: false, msg: "User already exists!" });
    const saltHash = passportUtils.genPassword(req.body.password);
    const data = await userService.createUser(
      req.body,
      saltHash.salt,
      saltHash.password,
    );
    res.status(200).json({
      success: true,
      data: {
        _id: data._id,
        name: data.name,
        email: data.email,
        number: data.number,
        role: data.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findUsers: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.findUsers();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findUserById: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.findUserById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "User not found!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userService.findUserById(req.body._id);
    if (!user)
      return res.status(401).json({ success: false, msg: "User not found!" });
    let data;
    if (req.body.password) {
      const saltHash = passportUtils.genPassword(req.body.password);
      const data = await userService.updateUser(
        req.body,
        saltHash.salt,
        saltHash.password,
      );
      return res.status(200).json({
        success: true,
        data: {
          _id: data?._id,
          name: data?.name,
          email: data?.email,
          number: data?.number,
          role: data?.role,
        },
      });
    }
    data = await userService.updateUser(req.body, user.password, user.salt);
    res.status(200).json({
      success: true,
      data: {
        _id: data?._id,
        name: data?.name,
        email: data?.email,
        number: data?.number,
        role: data?.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await userService.findUserById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "User not found!" });
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      data: {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        number: user?.number,
        role: user?.role,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const userController = {
  createUser,
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};

export default userController;
