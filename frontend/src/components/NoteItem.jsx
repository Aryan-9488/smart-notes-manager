function NoteItem({ note, onDelete }) {

  return (
    <div style={{
      border:"1px solid #ddd",
      padding:"10px",
      marginBottom:"10px"
    }}>

      <h3>{note.title}</h3>
      <p>{note.description}</p>

      {note.important && <span>⭐ Important</span>}

      <br/>

      <button onClick={()=>onDelete(note.id)}>
        Delete
      </button>

    </div>
  );
}

export default NoteItem;