import express from "express"
import { watch, getEdit, postEdit, getUpload, postUpload } from "../controllers/storyController";

const storyRouter = express.Router();

storyRouter.get("/:id(\\d+)", watch);
storyRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
storyRouter.route("/upload").get(getUpload).post(postUpload);

export default storyRouter;