// app/notes/page.tsx

"use client";

import { useState } from "react";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleClick = async () => {
    const response = await fetchNotes();
    if (response?.notes) {
      setNotes(response.notes);
    }
  };

  return (
    <section>
      <h1>Notes List</h1>
      <button onClick={handleClick}>Get my notes</button>
      {notes.length > 0 && <NoteList notes={notes} />}
    </section>
  );
};

export default Notes;
