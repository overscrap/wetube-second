import express from "express"
import { home } from "../controllers/storyController";
import { getJoin, getLogin, logout, postJoin, postLogin } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware} from "../middleware"

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/logout", protectorMiddleware, logout);

export default rootRouter;

