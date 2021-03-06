import express from "express";
import bodyParser from 'body-parser';
import cors from '../middlewares/cross-domain'

import multer from "multer";
import storage from '../storage'
import * as image from '../services/image';

import users from './user';
import posts from './post';
import login from './login';

const upload = multer({storage:storage});
const type = upload.single("image");
const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));
routes.use(cors);

routes.use('/api/v1', users);
routes.use('/api/v1', posts);
routes.use('/api/v1', login);

routes.post('/api/v1/upload/image', type, image.postImg);
routes.get('/api/v1/download/image/:file', image.getImg);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
