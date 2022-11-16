import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}

export const postJoin = async (req, res) => {
    const { email, userId, password, password2, name, location } = req.body
    const pageTitle = "Join";

    const exists = await User.exists({ $or: [{ userId }, { email }] });
    if (exists) {
        return res.status(400).render("join", { pageTitle, errorMessage: "This userId/email is already taken." });
    }
    if (password !== password2) {
        return res.status(400).render("join", { pageTitle, errorMessage: "password confirmation does not match." });
    }
    try {
        await User.create({
            email,
            userId,
            password,
            name,
            location
        })
    } catch (error) {
        return res.status(400).render("join", { pageTitle, errorMessage: error._message });
    }
    return res.redirect("/login");
}

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "Login" });
}

export const postLogin = async (req, res) => {
    const pageTitle = "Login";
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this userId does not exist."
        })
    }
    const passwordChk = await bcrypt.compare(password, user.password);
    if (!passwordChk) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password"
        })
    }

    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
}

export const myProfile = async (req, res) => {
    if(req.session.loggedIn){
        const {user} = req.session;
        const userInfo = await User.findOne({userId : user.userId});
        return res.render("my-profile", {pageTitle : `${user.name}'s profile`, userInfo});
    }else{
        return res.redirect("/");
    }
}
export const getEditProfile = (req, res) => {
    return res.render("edit-profile", {pageTitle:"Edit profile"});
}

export const postEditProfiles = (req,res) => {
    const {body : {title, description, hashtags}, file} = req;
    console.log(title, description, hashtags);
    console.log(file);
    return res.redirect(`/users/my-profile`);
}

