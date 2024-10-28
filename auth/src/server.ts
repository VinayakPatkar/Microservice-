import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { PORT, MONGO_URI } from "./config";
import { userrouter } from "./routes";

const app = express();

try {
    mongoose.connect(MONGO_URI)
    console.log("MongoDB connected")
} catch (error) {
    console.log(error);
    process.exit(1);
}


app.use(cors());
app.use(express.json());

app.use(userrouter);

/*app.use("/",(req,res) => {
    console.log("here")
})*/
app.listen(PORT, () => {
    console.log("Auth microservice started");
})
