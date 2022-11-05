export const stories = (req, res) => {
    const { id } = req.params;
    res.render("watch", { pageTitle: "Watch", id: id });
}
export const storiesEdit = (req, res) => {
    // res.send("<h1>storiesEdit</h1>");
    res.render("edit", { pageTitle: "StoryEdit" });
}
export const storiesDelete = (req, res) => {
    res.send("<h1>storiesDelete</h1>");
}