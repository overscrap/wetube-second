import express from "express"
import { create, join, login } from "../controllers/globalController";
import { trending } from "../controllers/storyController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/new", create);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;

