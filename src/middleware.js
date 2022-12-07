import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user;
    next();
}

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    }
}

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        console.log("publicOnlyMiddleware")
        return res.redirect("/");
    }
}

export const avatarUploadFiles = multer({
    dest: "uploads/avatar/",
    limits: {
        size : 3000000,
}});
export const storyUploadFiles = multer({
    dest: "uploads/video/",
    limits: {
        size : 50000000,
    }
});