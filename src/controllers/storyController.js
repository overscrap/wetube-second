import Story from "../models/Story";

export const home = async (req, res) => {
    try {
        const storyDatas = await Story.find({});
        console.log(storyDatas);
        return res.render("home", { pageTitle: "Home", storyDatas});
    } catch (error) {
        return res.render("server-error");
    }
}

export const show = async(req, res) => {
    const { id } = req.params;
    const story = await Story.findById({_id: id})
    return res.render("show", { pageTitle: `${story.title}`, story});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing` });
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/stories/${id}`);
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Story" });
}

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Story.create({
            title,
            description,
            hashtags: hashtags.split(",").map((word) => `#${word}`),
        });
    } catch (error) {
        console.log(error);
        return res.render("upload", { pageTitle: "Upload Story", errorMessage:error._message });
    }

    return res.redirect("/");
}

export const deleteStory = async (req, res) => {
    const { id } = req.params;
    return res.redirect("/");
}

export const searchStory = async (req, res) => {
    const { keyword } = req.query
    return res.render("search", { pageTitle: "Search"})
}