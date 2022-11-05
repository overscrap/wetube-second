export const home = (req, res) => {
    // res.send("<h1>Home</h1>");
    res.render("home", { pageTitle: "Home" });
}
export const trending = (req, res) => {
    res.send("<h1>Trending</h1>");
}
export const create = (req, res) => {
    res.send("<h1>New</h1>");
}
export const join = (req, res) => {
    res.send("<h1>Join</h1>");
}
export const login = (req, res) => {
    res.send("<h1>Login</h1>");
}



