package com.example.notes.service;

import com.example.notes.model.Note;
import com.example.notes.repository.NotesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesService {

    private final NotesRepository repository;

    public NotesService(NotesRepository repository) {
        this.repository = repository;
    }

    public List<Note> getAllNotes() {
        return repository.findAll();
    }

    public Note createNote(Note note) {
        return repository.save(note);
    }

    public void deleteNote(String id) {
        repository.deleteById(id);
    }

    public Note updateNote(String id, Note updatedNote) {
        updatedNote.setId(id);
        return repository.save(updatedNote);
    }
}