"use client";

import { useState } from "react";
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  hydrate,
} from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { NoteResponse } from "@/types/note";
import css from "../page.module.css";

interface NotesClientProps {
  page: number;
  perPage: number;
  search: string;
  dehydratedState: unknown;
}

export default function NotesClient({
  page: initialPage,
  perPage,
  search: initialSearch,
  dehydratedState,
}: NotesClientProps) {
  const [queryClient] = useState(() => {
    const qc = new QueryClient();
    hydrate(qc, dehydratedState);
    return qc;
  });

  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<NoteResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, perPage, debouncedSearch),
  });

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage + 1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={css.wrapper}>
        <h1>NoteHub</h1>

        <div className={css.header}>
          <SearchBox value={search} onChange={handleSearchChange} />
          <button className={css.button} onClick={handleOpenModal}>
            Create note
          </button>
        </div>

        {isModalOpen && (
          <Modal onClose={handleCloseModal}>
            <NoteForm
              onSuccess={handleCloseModal}
              onCancel={handleCloseModal}
            />
          </Modal>
        )}

        {isLoading && <p className={css.centered}>Loading, please wait...</p>}
        {isError && <p className={css.centered}>Something went wrong.</p>}

        {data && data.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}

        {data && data.totalPages > 1 && (
          <div className={css.centered}>
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
