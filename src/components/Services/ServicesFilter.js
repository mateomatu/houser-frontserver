import React, { useRef } from "react";

import styles from "./ServicesFilter.module.css";

const ServicesFilter = props => {

    const filterRef = useRef();

    const filterHandler = (event) => {

        const enteredFilter = filterRef.current.value;

        if (event.charCode === 13) {
            props.onFilterServices(enteredFilter);
        }
    }

    const titleClass = `${styles['services-filter']} gibson-semibold`;

    return (
        <div className={titleClass}>
            <input ref={filterRef} onKeyPress={filterHandler} maxLength={50} placeholder="Buscar servicio"></input>
        </div>
    );
}

export default ServicesFilter;