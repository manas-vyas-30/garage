import Order, { IOrder } from "../models/Order";

const findOrders = () => Order.find();

const createOrder = (order: IOrder) => {
  const newOrder = new Order({
    userId: order.userId,
    username: order.username,
    productId: order.productId,
    productName: order.productName,
    price: order.price,
  });
  return newOrder.save();
};

const findOrderById = (id: string) => Order.findById(id);

const updateOrder = (order: IOrder) => {
  const updatedOrder = {
    userId: order.userId,
    username: order.username,
    productId: order.productId,
    productName: order.productName,
    price: order.price,
  };
  return Order.findByIdAndUpdate(order._id, updatedOrder, {
    useFindAndModify: false,
  });
};

const deleteOrder = (id: string) => Order.findByIdAndDelete(id);

const orderService = {
  findOrders,
  createOrder,
  findOrderById,
  updateOrder,
  deleteOrder,
};

export default orderService;
