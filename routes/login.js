import express from 'express';
import { createJWToken } from "../libs/auth";

const routes = express.Router();

routes.post("/login", (req, res) => {
  let { email, password } = req.body;
  if (email === "toto" && password === "toto") {
    res.status(200).json({
      success: true,
      token: createJWToken({
        sessionData: { name: "toto", age: 15 },
        maxAge: 3600
      })
    });
  } else {
    res.status(401).json({
      message: "Login ou mot de passe incorrecte."
    });
  }
});

export default routes;
