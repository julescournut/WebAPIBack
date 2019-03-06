import path from 'path';
import fs from 'fs';

exports.postImg = (req, res) => {
  res.status(200).json(req.file);
};

exports.getImg = (req, res) => {
  var root = path.dirname(require.main.filename);
  var file = root + "/uploads/" + req.params.file;
  fs.readFile(file, function (err, data) {
    if (!err) {
      var contentType = 'image/' + path.extname(req.params.file).replace('.', '');
      var base64 = Buffer.from(data).toString('base64');
      base64='data:' + contentType + ';base64,' + base64;
      res.status(200).send(base64);
    }
    else {
      res.status(404).send("Not found");
    }
  });
};
