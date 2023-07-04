import CarForSell, { ICarForSell } from "../models/CarForSell";

const findCarsForSell = () => CarForSell.find();

const createCarForSell = (carForSell: ICarForSell, image: string) => {
  const newCarForSell = new CarForSell({
    name: carForSell.name,
    registration: carForSell.registration,
    cost: carForSell.cost,
    quantity: carForSell.quantity,
    sold: carForSell.sold,
    image,
  });
  return newCarForSell.save();
};

const findCarForSellById = (id: string) => CarForSell.findById(id);

const updateCarForSell = (carForSell: ICarForSell, image: string) => {
  const updatedCarForSell = {
    name: carForSell.name,
    registration: carForSell.registration,
    cost: carForSell.cost,
    quantity: carForSell.quantity,
    sold: carForSell.sold,
    image,
  };
  return CarForSell.findByIdAndUpdate(carForSell._id, updatedCarForSell, {
    useFindAndModify: false,
  });
};

const deleteCarForSell = (id: string) => CarForSell.findByIdAndDelete(id);

const carForSellService = {
  findCarsForSell,
  createCarForSell,
  findCarForSellById,
  updateCarForSell,
  deleteCarForSell,
};

export default carForSellService;
