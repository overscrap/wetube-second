import express from "express"
import { home } from "../controllers/storyController";
import { getJoin, login, postJoin } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(login).post();

export default rootRouter;

