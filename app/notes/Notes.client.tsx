"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, createNote, deleteNote } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", search],
    queryFn: ({ queryKey }) => {
      const [, searchTerm] = queryKey;
      return fetchNotes(searchTerm);
    },
  });

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleCreateSuccess = () => {
    // можна показати toast або просто перевантажити список
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  const handleCancel = () => {
    // можна очистити форму або закрити модалку, якщо така є
    console.log("Form cancelled");
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <>
      <input
        type="text"
        placeholder="Search notes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <NoteForm onSuccess={handleCreateSuccess} onCancel={handleCancel} />
      <NoteList notes={notes || []} onDelete={deleteNoteMutation.mutate} />
    </>
  );
}
