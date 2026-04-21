import axios from "axios";
import { Note } from "@/types/note";

export interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

// 👉 без статичних headers
const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
});

// 👉 додаємо токен на кожен запит
api.interceptors.request.use((config) => {
    const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const fetchNotes = async (
    search: string = "",
    page: number = 1,
    tag?: string
): Promise<NotesResponse> => {
    const params: Record<string, string | number> = {
        page,
    };

    if (search.trim()) {
        params.search = search;
    }

    if (tag && tag !== "all") {
        params.tag = tag;
    }

    const res = await api.get<NotesResponse>("/notes", { params });

    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await api.get<Note>(`/notes/${id}`);
    return res.data;
};

export const createNote = async (
    data: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
    const res = await api.post<Note>("/notes", data);
    return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await api.delete<Note>(`/notes/${id}`);
    return res.data;
};