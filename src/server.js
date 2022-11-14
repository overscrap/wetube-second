
import express from "express"
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import storyRouter from "./routers/storyRouter";

const app = express();
const logger = morgan("dev");

//pug 세팅
app.set("view engine", "pug");
//pug 경로설정
app.set("views", process.cwd() + "/src/views");

app.use(logger);
//form의 value들을 이해할 수 있도록 js형식으로 변형시켜주는 express middleWare
app.use(express.urlencoded({ extended: true }));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/stories", storyRouter);

export default app;