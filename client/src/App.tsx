import { useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "First Note",
      content:
        "First Content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore?",
    },
    {
      id: 2,
      title: "Second Note",
      content:
        "Second Content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore?",
    },
    {
      id: 3,
      title: "Third Note",
      content:
        "Third Content.Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore?",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app-container">
      <section>
        <div className="form-container">
          <form
            action=""
            className="note-form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              type="text"
              value={title}
              aria-label="input"
              className="title"
              placeholder="Title"
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <textarea
              value={content}
              name="content"
              id="note-content"
              aria-label="note-content"
              placeholder="Content"
              required
              rows={15}
              cols={30}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
            <button type="submit">Add Note</button>
          </form>
        </div>
      </section>

      <section>
        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-item">
              <div className="notes-header">
                <button type="submit" className="note-delete">
                  x
                </button>
              </div>
              <h2 className="note-title">{note.title}</h2>
              <p className="note-content">{note.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
