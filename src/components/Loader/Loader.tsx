import type { JSX } from "react";
import styles from "./Loader.module.css";

const Loader = (): JSX.Element => {
    return <p className={styles.text}>Loading movies, please wait...</p>;
};

export default Loader;