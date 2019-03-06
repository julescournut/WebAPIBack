import mongoose from "mongoose";
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  image: String,
  name: {
    type: String,
    required: true
  },
  pseudo: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.index({ name: 1 });
let User = mongoose.model("User", UserSchema, "Users");
User.createIndexes();

export default User;
