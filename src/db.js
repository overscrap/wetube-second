import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube")

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB! 🚀");
const handleError = (error) => console.log("❌ DB Error 💦", error);

db.on("error", handleError); //에러가 발생했을때 실행
db.once("open", handleOpen); //DB 연걸시 단 한번 실행