import multer from "multer";
import crypto from 'crypto';
import path from 'path';

export default multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    var id = crypto.randomBytes(20).toString('hex');
    const filename = id + path.extname(file.originalname);
    cb(null, filename);
  }
});
