import type { Metadata } from "next";
import {
    QueryClient,
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
    params: Promise<{ slug: string[] }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const rawTag = slug?.[0] ?? "all";

    const displayTag = rawTag === "all" ? "all notes" : rawTag;

    return {
        title: `Notes filter: ${displayTag} | NoteHub`,
        description: `Viewing notes filtered by "${displayTag}" in NoteHub application.`,
        openGraph: {
            title: `Notes filter: ${displayTag} | NoteHub`,
            description: `Viewing notes filtered by "${displayTag}" in NoteHub application.`,
            url: `https://notehub.vercel.app/notes/filter/${rawTag}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                },
            ],
        },
    };
}
export default async function Page({ params }: Props) {
    const { slug } = await params;

    const rawTag = slug?.[0] ?? "all";
    const tag = rawTag && rawTag !== "all" ? rawTag : undefined;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", "", 1, tag],
        queryFn: () => fetchNotes("", 1, tag),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}