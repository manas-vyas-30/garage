import User, { IUser } from "../models/User";

const registerUser = (user: IUser, salt: string, hash: string) => {
  const newUser = new User({
    name: user.name,
    email: user.email,
    password: hash,
    salt: salt,
    role: user.role,
    number: user.number,
  });
  return newUser.save();
};

const findUserByEmail = (email: string) => User.findOne({ email });

const authService = {
  registerUser,
  findUserByEmail,
};

export default authService;
