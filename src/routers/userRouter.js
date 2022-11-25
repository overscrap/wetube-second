import express from "express"
import { myProfile, getEditProfile, postEditProfiles, startGithubLogin, finishGithubLogin } from "../controllers/userController"
import { avatarUploadFiles } from "../middleware";

const userRouter = express.Router();

userRouter.get("/my-profile",myProfile);
userRouter.route("/edit-profile").get(getEditProfile).post(avatarUploadFiles.single("avatar"), postEditProfiles);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;