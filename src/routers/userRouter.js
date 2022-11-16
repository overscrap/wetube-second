import express from "express"
import { myProfile, getEditProfile, postEditProfiles } from "../controllers/userController"
import { uploadFiles } from "../middleware";

const userRouter = express.Router();

userRouter.get("/my-profile",myProfile);
userRouter.route("/edit-profile").get(getEditProfile).post(uploadFiles.single("avatar"), postEditProfiles);

export default userRouter;