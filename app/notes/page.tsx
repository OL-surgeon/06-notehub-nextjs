// app/notes/page.tsx
// "use client"

import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";

const Notes = async () => {
  const response = await fetchNotes();

  return (
    <section>
      <h1>Notes List</h1>
      <NoteList notes={response?.notes ?? []} />
    </section>
  );
};

export default Notes;
