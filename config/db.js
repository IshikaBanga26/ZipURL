import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the MongoDB");
}
export default connectToDB;