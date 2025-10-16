import express from "express";
import "dotenv/config"
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});
