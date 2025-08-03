import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", ""],
    queryFn: () => fetchNotes(""),
  });
}
