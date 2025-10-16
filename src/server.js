import express from "express";
import "dotenv/config"
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
