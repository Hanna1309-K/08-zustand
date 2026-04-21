import type { Metadata } from "next";
import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/note";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { id } = await params;

    let note;

    try {
        note = await fetchNoteById(id);
    } catch {
        return {
            title: "Note not found | NoteHub",
            description: "This note does not exist in NoteHub application.",
            openGraph: {
                title: "Note not found | NoteHub",
                description: "This note does not exist in NoteHub application.",
                url: `https://notehub.vercel.app/notes/${id}`,
                images: [
                    {
                        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    },
                ],
            },
        };
    }

    const description =
        note?.content?.length > 100
            ? note.content.slice(0, 100)
            : note?.content || "Note details";

    return {
        title: `${note.title} | NoteHub`,
        description,

        openGraph: {
            title: `${note.title} | NoteHub`,
            description,
            url: `https://notehub.vercel.app/notes/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: note.title,
                },
            ],
        },
    };
}

export default async function Page({ params }: Props) {
    const { id } = await params;

    const queryClient = new QueryClient();

    try {
        await queryClient.prefetchQuery({
            queryKey: ["note", id],
            queryFn: () => fetchNoteById(id),
        });
    } catch {
        notFound();
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={id} />
        </HydrationBoundary>
    );
}