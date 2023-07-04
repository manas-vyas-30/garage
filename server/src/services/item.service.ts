import Item, { IItem } from "../models/Item";

const findItems = () => Item.find();

const createItem = (item: IItem, image: string) => {
  const newItem = new Item({
    name: item.name,
    description: item.description,
    cost: item.cost,
    quantity: item.quantity,
    sold: item.sold,
    image,
  });
  return newItem.save();
};

const findItemById = (id: string) => Item.findById(id);

const updateItem = (item: IItem, image: string) => {
  const updatedItem = {
    name: item.name,
    description: item.description,
    cost: item.cost,
    quantity: item.quantity,
    sold: item.sold,
    image,
  };
  return Item.findByIdAndUpdate(item._id, updatedItem, {
    useFindAndModify: false,
  });
};

const deleteItem = (id: string) => Item.findByIdAndDelete(id);

const itemService = {
  findItems,
  createItem,
  findItemById,
  updateItem,
  deleteItem,
};

export default itemService;
