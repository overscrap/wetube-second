import User from "../models/User";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";
import Story from "../models/Story";

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
    const user = await User.findOne({ userId, socialOnly: false });
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

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}

export const myProfile = async (req, res) => {
    if(req.session.loggedIn){
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).render("404", {pageTitle: "User not found."});
        }
        const stories = await Story.find({ owner: user._id });
        console.log(stories)
        return res.render("users/my-profile", {pageTitle : `${user.name}'s profile`, user, stories});
    }else{
        return res.redirect("/");
    }
}
export const getEditProfile = (req, res) => {
    return res.render("edit-profile", {pageTitle:"Edit profile"});
}

export const postEditProfiles = async(req,res) => {
    const {
        session: {
            user:{_id, avataUrl}
        },
        body: {
            name,
            email,
            userId,
            location },
        file //req.file.path??? ????????? ?????? ????????? ????????? ????????? undefined??? ???.
    } = req;
    const exists = await User.exists({ $or: [{ userId }, { email }] });
    if (exists) {
        return res.status(400).render("edit-profile", { pageTitle:"Edit profile", errorMessage: "This userId/email is already taken." });
    }
    const updateUser = await User.findByIdAndUpdate(
        _id,
        {
            avatarUrl: file ? file.path : avataUrl,
            name,
            email,
            userId,
            location
        },
        {new:true}
    )
    req.session.user = updateUser;
    return res.redirect(`/users/my-profile`);
}

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    return res.redirect(finalUrl);
}

export const finishGithubLogin = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();

    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                }
            })
        ).json();
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                }
            })
        ).json();
        
        const emailObj = emailData.find(
            email => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            // set notification
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {
            user = await User.create({
                userId: userData.login,
                email: emailObj.email,
                name: userData.name,
                password: "",
                location: userData.location,
                socialOnly: true,
                avatarUrl : userData.avatar_url,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
}

export const getChangePassword = (req, res) => {
    return res.render("users/change-password", { pageTitle: "Change Password" });
}
export const postChangePassword = async (req, res) => {
    const {
        session: {
            user: { _id},
        },
        body: {
            oldPassword, newPassword, confirmPassword
        }
    } = req;
    const user = await User.findById(_id);
    const passwordChk = await bcrypt.compare(oldPassword, user.password);
    if (!passwordChk) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        });
    }
    if (newPassword !== confirmPassword) {
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        });
    }
    
    user.password = newPassword;
    await user.save();
    return res.redirect("/logout");
}