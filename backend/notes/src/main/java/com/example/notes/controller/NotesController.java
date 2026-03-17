package com.example.notes.controller;

import com.example.notes.model.Note;
import com.example.notes.service.NotesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    private final NotesService service;

    public NotesController(NotesService service) {
        this.service = service;
    }

    @GetMapping
    public List<Note> getAllNotes() {
        return service.getAllNotes();
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return service.createNote(note);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable String id) {
        service.deleteNote(id);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable String id, @RequestBody Note note) {
        return service.updateNote(id, note);
    }
}