import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Tag } from "@/types/note";

type Draft = {
    title: string;
    content: string;
    tag: Tag;
};

const initialDraft: Draft = {
    title: "",
    content: "",
    tag: "Todo",
};

type NoteStore = {
    draft: Draft;
    setDraft: (data: Draft) => void;
    clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,

            setDraft: (data) => set({ draft: data }),

            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: "note-draft", // localStorage key

            // 🔥 важливо для Next.js App Router (SSR fix)
            skipHydration: true,
        }
    )
);