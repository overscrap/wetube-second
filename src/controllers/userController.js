import User from "../models/User"

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}

export const postJoin = async(req, res) => {
    const { email, userId, password1, password2, name, location } = req.body
    const pageTitle = "Join";
    
    const exists = await User.exists({ $or: [{ userId }, { email }] });
    if (exists) {
        return res.render("join", { pageTitle, errorMessage: "This userId/email is already taken." });
    }
    if (password1 !== password2) {
        return res.render("join", { pageTitle, errorMessage: "password confirmation does not match." });
    }

    await User.create({
        email,
        userId,
        password: password1,
        name,
        location
    })
    return res.redirect("/login");
}

export const login = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
}



