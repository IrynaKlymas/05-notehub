import axios from "axios";
import type { Movie } from "../types/movie";

export interface TmdbResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

const apiClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
});

export const fetchMovies = async (
    query: string,
    page: number
): Promise<TmdbResponse> => {
    const response = await apiClient.get<TmdbResponse>("/search/movie", {
        params: { query, page },
    });
    return response.data;
};