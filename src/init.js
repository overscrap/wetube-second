import "dotenv/config" //가능한한 가장 빠르게 import해줘야한다.
import "./db";
import "./models/Story"
import "./models/User"
import app from "./server"

const PORT = 4000;

const handleListening = () =>
    console.log(`✅ Server listening on port ${PORT} 🚀`);

app.listen(PORT, handleListening);