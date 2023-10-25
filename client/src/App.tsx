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
        "First Content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore? Lorem ipsum dolor sit amet.",
    },
    {
      id: 2,
      title: "Second Note",
      content:
        "Second Content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore? Lorem ipsum dolor sit amet.",
    },
    {
      id: 3,
      title: "Third Note",
      content:
        "Third Content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore? Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, dolore? Lorem ipsum dolor sit amet.",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleNoteUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNoteList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNoteList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteID: number) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteID);
    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <section>
        <div className="form-container">
          <form
            className="note-form"
            onSubmit={(event) =>
              selectedNote ? handleNoteUpdate(event) : handleSubmit(event)
            }
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
            {selectedNote ? (
              <div className="edit-buttons">
                <button type="submit">Save</button>
                <button onClick={handleCancelEdit} type="button">
                  Cancel
                </button>
              </div>
            ) : (
              <button type="submit">Add Note</button>
            )}
          </form>
        </div>
      </section>

      <section>
        <div className="notes-grid">
          {notes.map((note) => (
            <div className="note-item" onClick={() => handleNoteClick(note)}>
              <div className="notes-header">
                <button
                  type="submit"
                  className="note-delete"
                  onClick={(event) => deleteNote(event, note.id)}
                >
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
