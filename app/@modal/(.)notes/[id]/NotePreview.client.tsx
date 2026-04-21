"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/note";

type Props = {
    id: string;
};

export default function NotePreview({ id }: Props) {
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id,
        refetchOnMount: false, // ✅ ОЦЕ ТРЕБА ДОДАТИ
    });

    return (
        <Modal onClose={() => router.back()}>
            {isLoading && <p>Loading...</p>}

            {error && <p>Error loading note</p>}

            {data && (
                <div>
                    <h2>{data.title}</h2>
                    <p><b>Tag:</b> {data.tag}</p>
                    <p>{data.content}</p>
                    <p>
                        <b>Created:</b>{" "}
                        {new Date(data.createdAt).toISOString()}
                    </p>
                </div>
            )}
        </Modal>
    );
}