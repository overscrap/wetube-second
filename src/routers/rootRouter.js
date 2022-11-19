import express from "express"
import { home } from "../controllers/storyController";
import { getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout",logout);

export default rootRouter;

