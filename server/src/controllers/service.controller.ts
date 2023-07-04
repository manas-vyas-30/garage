import { RequestHandler } from "express";
import serviceService from "../services/service.service";

const createService: RequestHandler = async (req, res, next) => {
  try {
    const data = await serviceService.createService(
      req.body,
      req?.file?.path ?? ``,
    );
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findServices: RequestHandler = async (req, res, next) => {
  try {
    const data = await serviceService.findServices();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findServiceById: RequestHandler = async (req, res, next) => {
  try {
    const data = await serviceService.findServiceById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Service not found!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateService: RequestHandler = async (req, res, next) => {
  try {
    const data = await serviceService.findServiceById(req.body._id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Service not found!" });
    const service = await serviceService.updateService(
      req.body,
      req.file ? req.file.path : data.image,
    );
    res.status(200).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteService: RequestHandler = async (req, res, next) => {
  try {
    const data = await serviceService.findServiceById(req.params.id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, msg: "Service not found!" });
    const service = await serviceService.deleteService(req.params.id);
    res.status(200).json({ success: true, data: service });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const serviceController = {
  createService,
  findServices,
  findServiceById,
  updateService,
  deleteService,
};

export default serviceController;
