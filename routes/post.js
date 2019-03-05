import express from 'express';
import bodyParser from 'body-parser';
import * as service from '../services/post';
import * as service_client from '../services/user';
import verifyJWT_MW from '../middlewares/auth.js';
import { getJWTPayloadData } from "../libs/auth";

const posts = express.Router();

posts.use(bodyParser.json());
posts.all("/posts", verifyJWT_MW);

posts.post("/posts", (req, res) => {
  let email = getJWTPayloadData(req).name;
  service_client.getByEmail(email).then(user => {
    service.createPost(req.body, user).then(
      post => res.status(200).json(post),
      err => {
        console.error(err);
        res.status(500).send("error");
        return;
      }
    );
  });
});

posts.get("/posts", (req, res) => {
  service
    .getByPage(req.query.page || 1, req.query.per_page || 10)
    .then(posts => res.status(200).json({ posts }));
});

posts.get("/posts/user", (req, res) => {
  let email = getJWTPayloadData(req).name;
  service_client.getByEmail(email).then(user => {
    service
      .getByPage_User(req.query.page || 1, req.query.per_page || 10, user._id)
      .then(posts => res.status(200).json({ posts }));
  });
});

export default posts;
