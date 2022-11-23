import Story from "../models/Story";

export const home = async (req, res) => {
    try {
        const storyDatas = await Story.find({}).sort({ createdAt: "desc" });
        return res.render("home", { pageTitle: "Home", storyDatas });
    } catch (error) {
        return res.render("server-error");
    }
}

export const show = async (req, res) => {
    const { id } = req.params;
    const story = await Story.findById({ _id: id })
    if (!story) {
        return res.render("404", { pageTitle: "Story not found." });
    } else {
        return res.render("show", { pageTitle: `${story.title}`, story });
    }
}
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const story = await Story.findById({ _id: id });
    if (!story) {
        return res.status(404).render("404", { pageTitle: " Story not found." });
    }
    return res.render("edit", { pageTitle: `Editing ${story.title}`, story }); ``
}
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const story = await Story.exists({ _id: id });

    if (!story) {
        return res.status(404).render("404", { pageTitle: "Story not found." });
    }

    await Story.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Story.formatHashtags(hashtags)
    });

    return res.redirect(`/stories/${id}`);
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Story" });
}

export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    const { path: fileUrl } = req.file;
    try {
        await Story.create({
            title,
            description,
            hashtags: Story.formatHashtags(hashtags),
            fileUrl
        });
    } catch (error) {
        return res.status(400).render("upload", { pageTitle: "Upload Story", errorMessage: error._message });
    }

    return res.redirect("/");
}

export const deleteStory = async (req, res) => {
    const { id } = req.params;
    try {
        await Story.findByIdAndDelete(id);
        return res.redirect("/");

    } catch (error) {
        return res.status(404).render("404", { pageTitle: "Delete Story", errorMessage: error._message });
    }
}

export const searchStory = async (req, res) => {
    const { keyword } = req.query
    let storyDatas = [];
    if (keyword) {
        storyDatas = await Story.find({
            title: {
                $regex: new RegExp(keyword, "i")
            }
        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", storyDatas });
}