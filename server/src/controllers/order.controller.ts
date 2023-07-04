import { RequestHandler } from "express";
import orderService from "../services/order.service";

const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const data = await orderService.createOrder(req.body);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findOrders: RequestHandler = async (req, res, next) => {
  try {
    const data = await orderService.findOrders();
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const findOrderById: RequestHandler = async (req, res, next) => {
  try {
    const data = await orderService.findOrderById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Order not found!" });
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const updateOrder: RequestHandler = async (req, res, next) => {
  try {
    const data = await orderService.findOrderById(req.body._id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Order not found!" });
    const order = await orderService.updateOrder(req.body);
    res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const deleteOrder: RequestHandler = async (req, res, next) => {
  try {
    const data = await orderService.findOrderById(req.params.id);
    if (!data)
      return res.status(404).json({ success: false, msg: "Order not found!" });
    const order = await orderService.deleteOrder(req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

const orderController = {
  createOrder,
  findOrders,
  findOrderById,
  updateOrder,
  deleteOrder,
};

export default orderController;
