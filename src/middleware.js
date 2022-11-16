import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn;
    res.locals.siteName = "Wetube";
    res.locals.loggedUser = req.session.user;
    next();
}

export const uploadFiles = multer({dest: "upload/"});