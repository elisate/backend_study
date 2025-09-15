import { signin } from "../controllers/userController";
import { login } from "../controllers/userController";
import express from "express";
const userRouter=express();
userRouter.post("/userRegistration",signin);
userRouter.post("/userLogin",login)


export default userRouter;