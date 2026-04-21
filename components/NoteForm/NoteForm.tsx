"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api/note";
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

            // ✅ очищаємо draft після успішного створення
            clearDraft();

            // ✅ повернення назад
            router.back();
        },
    });

    // ✅ ОНОВЛЕННЯ draft (по ТЗ — одразу при зміні полів)
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setDraft({
            ...draft,
            [name]: value,
        });
    };

    // ✅ submit форми
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate(draft);
    };

    // ✅ cancel НЕ очищає draft (по ТЗ)
    const handleCancel = () => {
        router.back();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            {/* TITLE */}
            <div className={css.formGroup}>
                <label>Title</label>
                <input
                    name="title"
                    value={draft.title}
                    onChange={handleChange}
                    className={css.input}
                />
            </div>

            {/* CONTENT */}
            <div className={css.formGroup}>
                <label>Content</label>
                <textarea
                    name="content"
                    value={draft.content}
                    onChange={handleChange}
                    className={css.textarea}
                />
            </div>

            {/* TAG */}
            <div className={css.formGroup}>
                <label>Tag</label>
                <select
                    name="tag"
                    value={draft.tag}
                    onChange={handleChange}
                    className={css.select}
                >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Todo">Todo</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            {/* ACTIONS */}
            <div className={css.actions}>
                <button
                    type="button"
                    onClick={handleCancel}
                    className={css.cancelButton}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className={css.submitButton}
                >
                    {mutation.isPending ? "Creating..." : "Create note"}
                </button>
            </div>
        </form>
    );
}