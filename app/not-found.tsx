import type { Metadata } from "next";
import css from "./NotFound.module.css";

export const metadata: Metadata = {
    title: "Page Not Found | NoteHub",
    description: "This page does not exist in NoteHub application.",

    openGraph: {
        title: "Page Not Found | NoteHub",
        description: "This page does not exist in NoteHub application.",
        url: "https://notehub.vercel.app/404",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub - 404 Page",
            },
        ],
    },
};

export default function NotFound() {
    return (
        <main>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>
                Sorry, the page you are looking for does not exist.
            </p>
        </main>
    );
}