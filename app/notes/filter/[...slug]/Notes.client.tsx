"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

type Props = {
    tag?: string;
};

export default function NotesClient({ tag }: Props) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["notes", debouncedSearch, page, tag],
        queryFn: () => fetchNotes(debouncedSearch, page, tag),
        placeholderData: keepPreviousData,
    });

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearch} />

                <button
                    className={css.button}
                    onClick={() => setIsModalOpen(true)}
                >
                    Create note
                </button>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading notes</p>}

            {data && (
                <>
                    <NoteList notes={data.notes} />

                    {data.totalPages > 1 && (
                        <Pagination
                            currentPage={page}
                            totalPages={data.totalPages}
                            onPageChange={setPage}
                        />
                    )}
                </>
            )}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onClose={() => setIsModalOpen(false)} />
                </Modal>
            )}
        </div>
    );
}