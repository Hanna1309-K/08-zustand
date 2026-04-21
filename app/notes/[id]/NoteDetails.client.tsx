"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

type Props = {
    id: string;
};

export default function NoteDetailsClient({ id }: Props) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id,
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Error loading note</p>;
    if (!data) return <p>No data</p>;

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.content}</p>

            <p><strong>Tag:</strong> {data.tag}</p>

            <p>
                <strong>Created:</strong>{" "}
                {new Date(data.createdAt).toISOString()}
            </p>
        </div>
    );
}