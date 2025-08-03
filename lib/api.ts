import axios from "axios";
import { Note } from "@/types/note";

axios.defaults.baseURL = "https://next-docs-api.onrender.com";

type NoteListResponse = {
  notes: Note[];
};

export const getNotes = async () => {
  const res = await axios.get<NoteListResponse>("/notes");
  return res.data;
};

const BASE_URL = "https://notehub-public.goit.study/api";

import { CreateNoteData } from "@/types/note";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN environment variable");
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function fetchNotes(search?: string): Promise<Note[]> {
  const url = new URL(`${BASE_URL}/notes`);
  if (search) {
    url.searchParams.append("search", search);
  }

  const response = await fetch(url.toString(), {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return response.json();
}

export async function getSingleNote(id: string): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch note by id");
  }

  return response.json();
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return response.json();
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}
export type { Note };
