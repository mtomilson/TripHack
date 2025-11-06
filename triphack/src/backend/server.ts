import express from "express";
import cors from "cors";
import amadeus from "./routes/amadeus";
import { expressMiddleware } from '@as-integrations/express4';


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/amadeus", amadeus);

app.listen(5000, () => {
  console.log("server running");
});
