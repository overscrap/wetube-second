import express from "express"
import { home, trending, create, join, login } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/trending", trending);
globalRouter.get("/new", create);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;

