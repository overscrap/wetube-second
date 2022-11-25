import express from "express"
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import storyRouter from "./routers/storyRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

//pug 세팅
app.set("view engine", "pug");
//pug 경로설정
app.set("views", process.cwd() + "/src/views");

app.use(logger);
//form의 value들을 이해할 수 있도록 js형식으로 변형시켜주는 express middleWare
app.use(express.urlencoded({ extended: true }));
//npm express-session
app.use(session({
    secret: process.env.COOKIE_SECRET,
    /*  
        resave: false,
        saveUninitialized: false,
        => 세션을 수정했을때만 세션을 DB에 저장하고 쿠키를 넘겨줌 
    */
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.DB_URL})
}));

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/users", userRouter);
app.use("/stories", storyRouter);

export default app;