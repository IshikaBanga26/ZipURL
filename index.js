import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import urlRouter from "./routes/apiRoutes.js";
import {redirectToUrl} from "./controllers/Url.js";

const app = express();
const port = process.env.PORT || 5000; 

connectToDB();

app.use(express.json());

//api routes
app.use("/api/url", urlRouter);
app.get("/:shortId", redirectToUrl);

app.listen(port, () => console.log(`Server is running on port ${port}`));
