
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import styles from "./App.module.css";

const App = () => {
    const [query, setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


    const {
        data,
        isError,
        isFetching,
    } = useQuery({
        queryKey: ["movies", query, page], 
        queryFn: () => fetchMovies(query, page),
        enabled: !!query, 
        placeholderData: keepPreviousData, 
    });

    useEffect(() => {
        if (isError) {
            toast.error("There was an error, please try again...");
        }

        if (data && data.results.length === 0) {
            toast.error("No movies found for your request.");
        }
    }, [isError, data]);

    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;

    const handleSearch = (newQuery: string): void => {
 
        setQuery(newQuery);
        setPage(1);
    };

    const handleSelectMovie = (movie: Movie): void => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = (): void => {
        setSelectedMovie(null);
    };

    return (
        <div className={styles.app}>
            <Toaster position="top-center" />
            <SearchBar onSubmit={handleSearch} />

            {}
            {totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    onPageChange={({ selected }) => setPage(selected + 1)}
                    forcePage={page - 1}
                    containerClassName={styles.pagination}
                    activeClassName={styles.active}
                    nextLabel="→"
                    previousLabel="←"
                />
            )}

            {}
            {isFetching && <Loader />}
            {isError && !isFetching && <ErrorMessage />}

            {}
            {movies.length > 0 && (
                <MovieGrid movies={movies} onSelect={handleSelectMovie} />
            )}

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default App;