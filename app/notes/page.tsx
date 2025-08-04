import { fetchNotes } from "@/lib/api";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "@/app/notes/Notes.client";

export default async function NotesPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const actualSearchParams = searchParams ? await searchParams : undefined;
  const search = actualSearchParams?.search || "";
  const page = 1;
  const perPage = 12;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, perPage, search),
  });

  return (
    <NotesClient
      page={page}
      perPage={perPage}
      search={search}
      dehydratedState={dehydrate(queryClient)}
    />
  );
}
