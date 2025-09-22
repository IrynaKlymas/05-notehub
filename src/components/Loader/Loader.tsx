import css from "./Loader.module.css";

interface LoaderProps {
    text?: string;
}

const Loader = ({ text = "Loading..." }: LoaderProps) => {
    return (
        <div className={css.loaderContainer}>
            <div className={css.loader}></div>
            <p>{text}</p>
        </div>
    );
};

export default Loader;