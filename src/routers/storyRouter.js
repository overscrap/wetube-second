import express from "express"
import { show, getEdit, postEdit, getUpload, postUpload, deleteStory, searchStory } from "../controllers/storyController";

const storyRouter = express.Router();

storyRouter.get("/:id(\\d+)", show);
storyRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
storyRouter.route("/upload").get(getUpload).post(postUpload);
storyRouter.get("/:id(\\d+)/delete", deleteStory);
storyRouter.get("/search", searchStory)

export default storyRouter;