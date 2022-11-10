import Story from "../models/Story";


export const home = (req, res) => {
    Story.find({}, (error, stories) =>{});
    return res.render("home", { pageTitle: "Home"});
}

export const show = (req, res) => {
    const { id } = req.params;
    return res.render("show", { pageTitle: `Show`});
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

export const postUpload = (req, res) => {
    const { title } = req.body;
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