import User from "../models/user";
import { createSHA256_Hash } from '../libs/auth.js';

export async function createUser(user) {
  if (user) {
    if (!user._id) {
      user.password = createSHA256_Hash(user.password);
      return User.create({ ...user });
    }
  }
}

export async function getByPage(page, per_page) {
  var start = (parseInt(page) - 1) * parseInt(per_page);
  let result = await User.find({})
    .skip(start)
    .limit(parseInt(per_page));
  return result;
}

export async function getCurrentUser(id) {
  let result = await User.findOne({ _id: id }).select("-password");
  return result;
}

export async function getByEmail(email) {
  let user = await User.findOne({ email: email });
  return user;
}
