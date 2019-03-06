import mongoose from "mongoose";
const Schema = mongoose.Schema;

var PostSchema = new Schema({
  image: String,
  description: String,
  author: {
    name: String,
    ref: { type: Schema.Types.ObjectId, ref: "User" },
  },
  date: {
    type: Date,
    default: Date.now
  }
});

PostSchema.index({ name: 1});
let Post = mongoose.model("Post", PostSchema, "Posts");

export default Post;
