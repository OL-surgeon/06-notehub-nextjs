import { Note, CreateNoteData } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function fetchNotes(search?: string): Promise<Note[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  const response = await fetch(`/api/notes?${params.toString()}`);
  if (!response.ok) throw new Error("Error fetching notes");
  return response.json();
}

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/notes/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch note by id");
  return response.json();
}

export async function createNote(data: CreateNoteData): Promise<Note> {
  return request<Note>("/notes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteNote(id: number): Promise<void> {
  return request<void>(`/notes/${id}`, {
    method: "DELETE",
  });
}
