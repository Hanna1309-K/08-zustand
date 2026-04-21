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

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const rawTag = slug?.[0];
    const tag = rawTag === "all" ? undefined : rawTag;

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