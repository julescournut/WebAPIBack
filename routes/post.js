import express from 'express';
import bodyParser from 'body-parser';
import * as service from '../services/post';

const posts = express.Router();

posts.use(bodyParser.json());

posts.post("/posts", (req, res) => {
  service.createPost(req.body).then(
    posts => res.status(200).json(posts),
    err => {
      console.error(err);
      res.status(500).send("error");
      return;
    }
  );
});

posts.get("/posts", (req, res) => {
  service
    .getByPage(req.query.page || 1, req.query.per_page || 10)
    .then(posts => res.status(200).json({ posts }));
});

export default posts;
