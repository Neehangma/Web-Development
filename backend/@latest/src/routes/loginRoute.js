import { loginController } from "../controllers/loginController.js";

import express from "express";
const loginrouter = express.Router();

loginrouter.post("/login", loginController);

export default loginrouter;
