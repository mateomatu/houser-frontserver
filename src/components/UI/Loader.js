import React from "react";

import styles from "./Loader.module.css";


const Loader = () => {
    return (
        <div className={`${styles['wrapper']} ${styles['only-charge']}`}>
            <div id={styles.loader2}></div>
        </div>
    );
}

export default Loader;