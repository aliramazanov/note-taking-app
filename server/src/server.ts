import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT: number | string = process.env.PORT || 9595;
app.get("/api/notes", async (_req, res) => {
  res.json({ message: "GET Request successfull!" });
});

app.listen(PORT, () => {
  console.log(`Server is up & running! On http://localhost:${PORT}`);
});
