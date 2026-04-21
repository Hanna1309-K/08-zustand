"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });

    const handleDelete = (id: string) => {
        mutation.mutate(id);
    };

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id} className={css.listItem}>

                    {/* TITLE + LINK */}
                    <Link href={`/notes/${note.id}`} className={css.link}>
                        <h3 className={css.title}>{note.title}</h3>
                    </Link>

                    {/* CONTENT */}
                    <p className={css.content}>{note.content}</p>

                    {/* FOOTER (TAG + DELETE) */}
                    <div className={css.footer}>

                        <span className={css.tag}>{note.tag}</span>

                        <button
                            onClick={() => handleDelete(note.id)}
                            className={css.button}
                        >
                            Delete
                        </button>

                    </div>
                </li>
            ))}
        </ul>
    );
}