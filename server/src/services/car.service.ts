import Car, { ICar } from "../models/Car";

const findCars = () => Car.find();

const createCar = (car: ICar, image: string) => {
  const newCar = new Car({
    name: car.name,
    registration: car.registration,
    userId: car.userId,
    image,
  });
  return newCar.save();
};

const findCarById = (id: string) => Car.findById(id);

const updateCar = (car: ICar, image: string) => {
  const updatedCar = {
    name: car.name,
    registration: car.registration,
    userId: car.userId,
    image,
  };
  return Car.findByIdAndUpdate(car._id, updatedCar, {
    useFindAndModify: false,
  });
};

const deleteCar = (id: string) => Car.findByIdAndDelete(id);

const findCarByUser = (userId: string) => Car.find({ userId });

const carService = {
  findCars,
  createCar,
  findCarById,
  updateCar,
  deleteCar,
  findCarByUser,
};

export default carService;
