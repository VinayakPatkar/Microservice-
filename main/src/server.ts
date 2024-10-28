import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(8002,() => {
    console.log("Main microservice running")
})