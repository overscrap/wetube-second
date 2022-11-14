import express from "express"
import { home } from "../controllers/storyController";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;

