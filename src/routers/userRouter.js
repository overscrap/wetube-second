import express from "express"
import { myProfile, getEditProfile, postEditProfiles, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController"
import { avatarUploadFiles, protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/my-profile",myProfile);
userRouter.route("/edit-profile").all(protectorMiddleware).get(getEditProfile).post(avatarUploadFiles.single("avatar"), postEditProfiles);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);

export default userRouter;