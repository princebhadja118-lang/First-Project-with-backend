const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const app = express();
require("dotenv").config()

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());

connectDB()
app.use("/", authRoutes);


app.listen(5000, (req, res) => {
    console.log("Server running on port 5000");

})