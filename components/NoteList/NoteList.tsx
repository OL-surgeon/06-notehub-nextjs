import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import { Note } from "../../types/note";
import { deleteNote } from "../../lib/api";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Ви впевнені, що хочете видалити нотатку?")) {
      deleteMutation.mutate(id);
    }
  };

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default NoteList;
