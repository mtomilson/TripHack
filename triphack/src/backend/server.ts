import express from "express";
import cors from "cors";
import amadeus from "./routes/amadeus"

const app = express();

app.use("/api/amadeus", amadeus)


app.listen(5000, () => {
    console.log("server running");
})