import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.port;

app.listen(port, () => {
  console.log(`Server is up & running! On http://localhost:${port}`);
});
