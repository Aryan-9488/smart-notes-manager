import { useEffect, useMemo, useState } from "react";
import { addNote, deleteNote, getNotes, updateNote } from "./services/api";
import "./App.css";

const emptyForm = {
  title: "",
  description: "",
  important: false
};

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadNotes = async () => {
    try {
      setError("");
      const res = await getNotes();
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Unable to load notes. Please check that the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return notes.filter((note) => {
      const matchesQuery =
        note.title?.toLowerCase().includes(query) ||
        note.description?.toLowerCase().includes(query);
      const matchesFilter = filter === "all" || Boolean(note.important);

      return matchesQuery && matchesFilter;
    });
  }, [filter, notes, searchTerm]);

  const importantCount = notes.filter((note) => note.important).length;

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        important: form.important
      };

      if (editingId) {
        await updateNote(editingId, payload);
      } else {
        await addNote(payload);
      }

      resetForm();
      await loadNotes();
    } catch {
      setError("Unable to save note. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setForm({
      title: note.title || "",
      description: note.description || "",
      important: Boolean(note.important)
    });
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteNote(id);
      if (editingId === id) {
        resetForm();
      }
      await loadNotes();
    } catch {
      setError("Unable to delete note. Please try again.");
    }
  };

  const handleToggleImportant = async (note) => {
    try {
      setError("");
      await updateNote(note.id, {
        title: note.title,
        description: note.description,
        important: !note.important
      });
      await loadNotes();
    } catch {
      setError("Unable to update note importance.");
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Full-stack notes workspace</p>
          <h1>Smart Notes Manager</h1>
          <p className="hero-copy">
            Capture notes, mark key ideas, search instantly, and manage updates
            from a Spring Boot + MongoDB backend.
          </p>
        </div>

        <div className="stats-panel" aria-label="Notes summary">
          <span>
            <strong>{notes.length}</strong>
            Total
          </span>
          <span>
            <strong>{importantCount}</strong>
            Important
          </span>
        </div>
      </section>

      <section className="workspace">
        <form className="note-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <div>
              <p className="section-label">{editingId ? "Edit note" : "New note"}</p>
              <h2>{editingId ? "Update your note" : "Add a note"}</h2>
            </div>
            {editingId && (
              <button className="ghost-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>

          <label>
            Title
            <input
              name="title"
              placeholder="Project idea, reminder, or task"
              value={form.title}
              onChange={handleChange}
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              placeholder="Write the details here..."
              rows="5"
              value={form.description}
              onChange={handleChange}
            />
          </label>

          <label className="checkbox-row">
            <input
              name="important"
              type="checkbox"
              checked={form.important}
              onChange={handleChange}
            />
            Mark as important
          </label>

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" disabled={saving} type="submit">
            {saving ? "Saving..." : editingId ? "Save changes" : "Add note"}
          </button>
        </form>

        <section className="notes-panel">
          <div className="toolbar">
            <input
              aria-label="Search notes"
              placeholder="Search notes"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <div className="segmented-control" aria-label="Filter notes">
              <button
                className={filter === "all" ? "active" : ""}
                type="button"
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={filter === "important" ? "active" : ""}
                type="button"
                onClick={() => setFilter("important")}
              >
                Important
              </button>
            </div>
          </div>

          <div className="notes-list">
            {loading && <p className="empty-state">Loading notes...</p>}

            {!loading && filteredNotes.length === 0 && (
              <p className="empty-state">
                {notes.length === 0
                  ? "No notes yet. Add your first note."
                  : "No notes match your search."}
              </p>
            )}

            {filteredNotes.map((note) => (
              <article className="note-card" key={note.id}>
                <div className="note-card-header">
                  <h3>{note.title}</h3>
                  {note.important && <span className="important-badge">Important</span>}
                </div>

                <p>{note.description || "No description added."}</p>

                <div className="note-actions">
                  <button type="button" onClick={() => handleToggleImportant(note)}>
                    {note.important ? "Unmark" : "Mark important"}
                  </button>
                  <button type="button" onClick={() => handleEdit(note)}>
                    Edit
                  </button>
                  <button
                    className="danger-button"
                    type="button"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
