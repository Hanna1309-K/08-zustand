"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { Tag } from "@/types/note";

export default function NoteForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useNoteStore();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            router.back();
        },
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setDraft({
            ...draft,
            [name]: name === "tag" ? (value as Tag) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(draft);
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <input
                name="title"
                value={draft.title}
                onChange={handleChange}
            />

            <textarea
                name="content"
                value={draft.content}
                onChange={handleChange}
            />

            <select name="tag" value={draft.tag} onChange={handleChange}>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Todo">Todo</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
            </select>

            <button type="button" onClick={handleCancel}>
                Cancel
            </button>

            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Create note"}
            </button>
        </form>
    );
}