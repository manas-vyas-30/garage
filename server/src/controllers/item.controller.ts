import { RequestHandler } from "express";
import itemService from "../services/item.service";

const createItem: RequestHandler = async (req, res, next) => {
  try {
    const data = await itemService.createItem(req.body, req?.file?.path ?? ``);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findItems: RequestHandler = async (req, res, next) => {
  try {
    const data = await itemService.findItems();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findItemById: RequestHandler = async (req, res, next) => {
  try {
    const data = await itemService.findItemById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Item not found!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateItem: RequestHandler = async (req, res, next) => {
  try {
    const data = await itemService.findItemById(req.body._id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Item not found!" });
    const item = await itemService.updateItem(
      req.body,
      req.file ? req.file.path : data.image,
    );
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteItem: RequestHandler = async (req, res, next) => {
  try {
    const data = await itemService.findItemById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Item not found!" });
    const item = await itemService.deleteItem(req.params.id);
    res.status(200).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const itemController = {
  createItem,
  findItems,
  findItemById,
  updateItem,
  deleteItem,
};

export default itemController;
