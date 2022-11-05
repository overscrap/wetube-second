import express from "express"
import { users, userId, editProfile } from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/edit-profile", editProfile);
userRouter.get("/:id", userId);

export default userRouter;