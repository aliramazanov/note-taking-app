import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (_req, res) => {
  res.send("Hi there!");
});

app.listen(9595, () => {
  console.log(`Server is up & running! On http://localhost:9595`);
});
