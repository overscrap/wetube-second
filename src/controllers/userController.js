export const users = (req, res) => {
    res.send("<h1>Users</h1>");
}
export const editProfile = (req, res) => {
    res.send("<h1>EditProfile</h1>");
}
export const userId = (req, res) => {
    const { id } = req.params;
    res.send(`<h1>UserId: ${id}</h1>`);
}



