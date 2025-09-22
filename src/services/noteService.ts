import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const apiClient = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
});

apiClient.interceptors.request.use((config) => {
    const token = import.meta.env.VITE_NOTEHUB_TOKEN;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface FetchNotesParams {
    page?: number;
    query?: string;
}

export interface NewNotePayload {
    title: string;
    content: string;
    tag: NoteTag;
}

export const fetchNotes = async ({
    page = 1,
    query = "",
}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await apiClient.get<FetchNotesResponse>("/notes", {
        params: {
            page,
            perPage: 12,
            ...(query ? { search: query } : {}),
        },
    });
    return response.data;
};


export const createNote = async (noteData: NewNotePayload): Promise<Note> => {
    const response = await apiClient.post<Note>("/notes", noteData);
    return response.data;
};


export const deleteNote = async (noteId: string): Promise<Note> => {
    if (!noteId) {
        throw new Error("Note ID is required for deletion");
    }
    const response = await apiClient.delete<Note>(`/notes/${noteId}`);
    return response.data;
};