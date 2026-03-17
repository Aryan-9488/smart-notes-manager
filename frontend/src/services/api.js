import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

export const getNotes = () => API.get("/notes");
export const addNote = (note) => API.post("/notes", note);
export const deleteNote = (id) => API.delete(`/notes/${id}`);
export const updateNote = (id, note) => API.put(`/notes/${id}`, note);