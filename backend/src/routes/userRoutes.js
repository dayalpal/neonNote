import express from "express";

const userRouter = express.Router();

import { getAllUsers, createUser, loginUser } from "../controllers/userController.js";

userRouter.get("/get", getAllUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);

export default userRouter;