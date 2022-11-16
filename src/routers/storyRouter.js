import express from "express"
import { show, getEdit, postEdit, getUpload, postUpload, deleteStory, searchStory } from "../controllers/storyController";
import { storyUploadFiles } from "../middleware";

const storyRouter = express.Router();

storyRouter.get("/:id([0-9a-f]{24})", show);
storyRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
storyRouter.route("/upload").get(getUpload).post(storyUploadFiles.single("story"), postUpload);
storyRouter.get("/:id([0-9a-f]{24})/delete", deleteStory);
storyRouter.get("/search", searchStory)

export default storyRouter;