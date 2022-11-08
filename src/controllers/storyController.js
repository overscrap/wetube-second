const fakeUser = {
    username: "overscrap",
    loggedIn: true
}

const storyDatas = [
    {
        title: "First Story",
        rating: 2,
        comments: 2,
        creatAt: "10 minute ago",
        views: 1,
        id: 1
    },
    {
        title: "Second Story",
        rating: 4,
        comments: 2,
        creatAt: "20 minute ago",
        views: 100,
        id: 2
    },
    {
        title: "Third Story",
        rating: 5,
        comments: 232,
        creatAt: "30 minute ago",
        views: 200,
        id: 3
    },
];

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", fakeUser, storyDatas });
}

export const show = (req, res) => {
    const { id } = req.params;
    const story = storyDatas[id - 1];
    return res.render("show", { pageTitle: `${story.title}`, story });
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    const story = storyDatas[id - 1];
    return res.render("edit", { pageTitle: `Editing: ${story.title}`, story });
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    storyDatas[id - 1].title = title;
    return res.redirect(`/stories/${id}`);
}

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Story" });
}

export const postUpload = (req, res) => {
    const { title } = req.body;
    const newStory = {
        title,
        rating: 0,
        comments: 0,
        createAt: "just now",
        views: 0,
        id: storyDatas.length + 1
    }
    storyDatas.push(newStory);
    return res.redirect("/");
    //here we will add a video to the videos array.
}

export const deleteStory = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    return res.redirect("/");
}

export const searchStory = async (req, res) => {
    const { keyword } = req.query
    console.log(keyword);
    return res.render("search", { pageTitle: "Search Page", storyDatas })
}