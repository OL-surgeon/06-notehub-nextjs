import { fetchNotes } from "@/lib/api";
import { QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { NoteResponse } from "@/types/note";

export default async function NotesPage() {
  const page = 1;
  const perPage = 12;
  const search = "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<NoteResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, perPage, search),
  });

  const initialData = queryClient.getQueryData<NoteResponse>([
    "notes",
    page,
    search,
  ]);

  return (
    <NotesClient
      page={page}
      perPage={perPage}
      search={search}
      initialData={initialData!}
    />
  );
}
