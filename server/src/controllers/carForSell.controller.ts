import { RequestHandler } from "express";
import carForSellService from "../services/carForSell.service";

const createCarForSell: RequestHandler = async (req, res, next) => {
  try {
    const data = await carForSellService.createCarForSell(
      req.body,
      req?.file?.path ?? ``,
    );
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarsForSell: RequestHandler = async (req, res, next) => {
  try {
    const data = await carForSellService.findCarsForSell();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findCarForSellById: RequestHandler = async (req, res, next) => {
  try {
    const data = await carForSellService.findCarForSellById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateCarForSell: RequestHandler = async (req, res, next) => {
  try {
    const data = await carForSellService.findCarForSellById(req.body._id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    const car = await carForSellService.updateCarForSell(
      req.body,
      req.file ? req.file.path : data.image,
    );
    res.status(200).json({ success: true, data: car });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteCarForSell: RequestHandler = async (req, res, next) => {
  try {
    const data = await carForSellService.findCarForSellById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Car not found!" });
    const car = await carForSellService.deleteCarForSell(req.params.id);
    res.status(200).json({ success: true, data: car });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const carForSellController = {
  createCarForSell,
  findCarsForSell,
  findCarForSellById,
  updateCarForSell,
  deleteCarForSell,
};

export default carForSellController;
