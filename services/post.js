import Post from "../models/post";

export async function createPost(post, user) {
  if (post) {
    if (!post._id) {
      return Post.create({ image: post.image, description: post.description, author: { name: user.name, ref: user._id } });
    }
  }
}

export async function getByPage(page, per_page) {
  var start = (parseInt(page) - 1) * parseInt(per_page);
  let result = await Post.find({})
    .populate({
      path: "author.ref",
      model: "User"
    })
    .skip(start)
    .limit(parseInt(per_page))
    .sort('-date');
  return result;
}

export async function getByPage_User(page, per_page, id) {
  var start = (parseInt(page) - 1) * parseInt(per_page);
  let result = await Post.find({ 'author.ref': id })
    .populate({
      path: "author.ref",
      model: "User"
    })
    .skip(start)
    .limit(parseInt(per_page))
    .sort('-date');
  return result;
}
