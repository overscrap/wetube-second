import express from "express"
import { stories, storiesEdit, storiesDelete } from "../controllers/storyController";

const storyRouter = express.Router();

storyRouter.get("/:id", stories);
storyRouter.get("/:id/edit", storiesEdit);
storyRouter.get("/:id/delete", storiesDelete);

export default storyRouter;