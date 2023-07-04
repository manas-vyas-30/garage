import User, { IUser } from "../models/User";

const findUsers = () => User.find({}, { salt: 0, password: 0, __v: 0 });

const createUser = (user: IUser, salt: string, password: string) => {
  const newUser = new User({
    name: user.name,
    email: user.email,
    password,
    salt,
    role: user.role,
    number: user.number,
  });
  return newUser.save();
};

const findUserById = (id: string) =>
  User.findById(id, { salt: 0, password: 0, __v: 0 });

const findUserByEmail = (email: string) =>
  User.findOne({ email }, { salt: 0, password: 0, __v: 0 });

const updateUser = (user: IUser, salt: string, password: string) => {
  const updatedUser = {
    name: user.name,
    email: user.email,
    password,
    salt,
    role: user.role,
    number: user.number,
  };
  return User.findByIdAndUpdate(user._id, updatedUser, {
    useFindAndModify: false,
  });
};

const deleteUser = (id: string) => User.findByIdAndDelete(id);

const userService = {
  findUsers,
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser,
};

export default userService;
