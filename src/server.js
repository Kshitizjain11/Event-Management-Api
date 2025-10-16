import express from "express";
import dotenv from "dotenv"
import errorHandler from "./middleware/errorHandler.js";
import eventRoute from "./routes/events.js";
import userRoute from "./routes/users.js";
dotenv.config()
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/events", eventRoute)
app.use("/api/users", userRoute)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
