import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import styles from "./MovieModal.module.css";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
}

const modalRoot = document.body;

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.code === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [onClose]);

    const handleBackdropClick = (
        event: React.MouseEvent<HTMLDivElement>
    ): void => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    return createPortal(
        <div
            className={styles.backdrop}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <div className={styles.modal}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className={styles.image}
                />
                <div className={styles.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date:</strong> {movie.release_date}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
                        /10
                    </p>
                </div>
            </div>
        </div>,
        modalRoot
    );
};

export default MovieModal;