import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000; 

connectToDB();

app.listen(port, () => console.log(`Server is running on port ${port}`));
