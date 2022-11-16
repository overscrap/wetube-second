import express from "express"
import { myProfile, getEditProfile, postEditProfiles } from "../controllers/userController"
import { avatarUploadFiles } from "../middleware";

const userRouter = express.Router();

userRouter.get("/my-profile",myProfile);
userRouter.route("/edit-profile").get(getEditProfile).post(avatarUploadFiles.single("avatar"), postEditProfiles);

export default userRouter;