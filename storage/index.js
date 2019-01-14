import multer from "multer";

export default multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "upload/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
