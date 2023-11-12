import { useEffect, useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:9595/api/notes");
        const data = await response.json();

        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:9595/api/notes", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newNote: Note = await response.json();
        setNotes([newNote, ...notes]);
        setTitle("");
        setContent("");
      } else {
        console.error("Server error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleNoteUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9595/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedNote = await response.json();
      const updatedNoteList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );

      setNotes(updatedNoteList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCancelEdit = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteID: number) => {
    event.stopPropagation();

    try {
      await fetch(`http://localhost:9595/api/notes/${noteID}`, {
        method: "DELETE",
      });
      const updatedNotes = notes.filter((note) => note.id !== noteID);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
              <button type="submit">New Note</button>
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
