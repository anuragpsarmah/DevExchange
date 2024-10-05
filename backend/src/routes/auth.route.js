import { Router } from "express";
import { createUser } from "../controllers/auth/auth.controller.js";

export const authRouter = Router();
authRouter.route("/createUser").post(createUser);
