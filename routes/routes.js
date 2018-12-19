import users from './user';
import posts from './post';
import express from "express";
import bodyParser from 'body-parser';

const routes = express.Router();

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.use('/api/v1', users);
routes.use('/api/v1', posts);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
