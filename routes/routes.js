import users from './user';
import posts from './post';
import express from "express";
import bodyParser from 'body-parser';
import multer from "multer";
import storage from '../storage'
import * as image from '../services/image';

const upload = multer({storage:storage});
const type = upload.single("image");
const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.use('/api/v1', users);
routes.use('/api/v1', posts);

routes.post('/api/v1/upload/image', type, image.postImg);
routes.get('/api/v1/upload/image/:file', image.getImg);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
