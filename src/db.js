import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection;

const handleOpen = () => console.log("β Connected to DB! π");
const handleError = (error) => console.log("β DB Error π¦", error);

db.on("error", handleError); //μλ¬κ° λ°μνμλ μ€ν
db.once("open", handleOpen); //DB μ°κ±Έμ λ¨ νλ² μ€ν