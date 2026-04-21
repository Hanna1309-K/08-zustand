import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
    title: "Create note | NoteHub",
    description: "Create a new note in NoteHub application.",
    openGraph: {
        title: "Create note | NoteHub",
        description: "Create a new note in NoteHub application.",
        url: "https://notehub.vercel.app/notes/action/create",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            },
        ],
    },
};

export default function Page() {
    return (
        <main>
            <h1>Create note</h1>
            <NoteForm />
        </main>
    );
}