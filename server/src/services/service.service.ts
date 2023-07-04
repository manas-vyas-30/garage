import Service, { IService } from "../models/Service";

const findServices = () => Service.find();

const createService = (service: IService, image: string) => {
  const newService = new Service({
    name: service.name,
    cost: service.cost,
    description: service.description,
    image,
  });
  return newService.save();
};

const findServiceById = (id: string) => Service.findById(id);

const updateService = (service: IService, image: string) => {
  const updatedService = {
    name: service.name,
    cost: service.cost,
    description: service.description,
    image,
  };
  return Service.findByIdAndUpdate(service._id, updatedService, {
    useFindAndModify: false,
  });
};

const deleteService = (id: string) => Service.findByIdAndDelete(id);

const serviceService = {
  findServices,
  createService,
  findServiceById,
  updateService,
  deleteService,
};

export default serviceService;
