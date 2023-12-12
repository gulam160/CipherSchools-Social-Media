import express from "express";
import { loginUser, registerUser } from "../controllers/authController";

const authRoute = express.Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);

export { authRoute };
