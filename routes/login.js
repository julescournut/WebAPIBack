import express from 'express';
import { createJWToken } from "../libs/auth";
import * as service from '../services/user';

const routes = express.Router();

routes.post("/login", (req, res) => {
  let { email, password } = req.body;

  service.getByEmail(email).then(user => {
    if (user !== null && email === user.email && password === user.password) {
      res.status(200).json({
        success: true,
        token: createJWToken({
          sessionData: { name: email, age: 15 },
          maxAge: 3600
        })
      });
    } else {
      res.status(401).json({
        message: "Login ou mot de passe incorrecte."
      });
    }
  });
});

export default routes;
