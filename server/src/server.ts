import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title & Content fields are required!");
  }

  try {
    const note = await prisma.note.create({
      data: { title, content },
    });
    res.json(note);
  } catch (error) {
    res.sendStatus(500).send("Unexpected Error!");
  }
});

app.put("/api/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.sendStatus(400).send("ID must be a number!");
  }

  if (!title || !content) {
    return res.sendStatus(400).send("Title & Content fields are required!");
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedNote);
  } catch (error) {
    res.sendStatus(500).send("Unexpected Error!");
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.sendStatus(400).send("ID must be a number!");
  }

  try {
    await prisma.note.delete({
      where: { id },
    });
    return res.status(204).send("Deleted!");
  } catch (error) {
    res.sendStatus(500).send("Unexpected Error!");
  }
});

const port = process.env.port;

app.listen(port, () => {
  console.log(`Server is up & running! On http://localhost:${port}`);
});
