import { RequestHandler } from "express";
import carService from "../services/car.service";

const createCar: RequestHandler = async (req, res, next) => {
  try {
    const data = await carService.createCar(req.body, req?.file?.path ?? ``);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCars: RequestHandler = async (req, res, next) => {
  try {
    const data = await carService.findCars();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarById: RequestHandler = async (req, res, next) => {
  try {
    const data = await carService.findCarById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCar: RequestHandler = async (req, res, next) => {
  try {
    const data = await carService.findCarById(req.body._id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    const car = await carService.updateCar(
      req.body,
      req.file ? req.file.path : data.image,
    );
    res.status(200).json({ success: true, data: car });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCar: RequestHandler = async (req, res, next) => {
  try {
    const data = await carService.findCarById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    const car = await carService.deleteCar(req.params.id);
    res.status(200).json({ success: true, data: car });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarByUser: RequestHandler = async (req, res, next) => {
  try {
    const data = await carService.findCarByUser(req.params.userId);
    if (data.length === 0)
      return res
        .status(404)
        .json({ success: false, msg: "User does not have any car!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const carController = {
  createCar,
  findCars,
  findCarById,
  updateCar,
  deleteCar,
  findCarByUser,
};

export default carController;
