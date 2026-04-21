"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api/note";
import { useNoteStore } from "@/lib/store/noteStore";
import type { Tag } from "@/types/note";

type Props = {
    onClose?: () => void;
};

export default function NoteForm({ onClose }: Props) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useNoteStore();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            clearDraft();
            onClose?.(); // 👈 безпечно
        },
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setDraft({
            ...draft,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(draft);
    };

    const handleCancel = () => {
        onClose?.(); // 👈 або router.back()
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label>Title</label>
                <input name="title" value={draft.title} onChange={handleChange} />
            </div>

            <div className={css.formGroup}>
                <label>Content</label>
                <textarea name="content" value={draft.content} onChange={handleChange} />
            </div>

            <div className={css.formGroup}>
                <label>Tag</label>
                <select name="tag" value={draft.tag} onChange={handleChange}>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Todo">Todo</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>

                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Creating..." : "Create note"}
                </button>
            </div>
        </form>
    );
}