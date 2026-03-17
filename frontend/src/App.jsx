import { useEffect, useState } from "react";
import { getNotes, addNote, deleteNote } from "./services/api";

function App() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await getNotes();
      setNotes(res.data);
    };
    fetchNotes();
  }, []);

  const handleAdd = async () => {
    if (!title) return;

    await addNote({
      title,
      description,
      important: false
    });

    setTitle("");
    setDescription("");
    loadNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <div style={{padding:"20px"}}>

      <h1>Smart Notes Manager</h1>

      <div>
        <input
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <button onClick={handleAdd}>
          Add Note
        </button>
      </div>

      <hr/>

      {notes.map((note)=>(
        <div key={note.id} style={{
          border:"1px solid gray",
          padding:"10px",
          marginTop:"10px"
        }}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>

          {note.important && <span>⭐ Important</span>}

          <br/>

          <button onClick={()=>handleDelete(note.id)}>
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default App;