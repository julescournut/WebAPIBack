exports.postImg = (req, res) => {
  res.status(200).json(req.file);
};

exports.getImg = (req, res) => {
  var file = "upload/" + req.params.file;
  res.download(file); // Set disposition and send it.
};
