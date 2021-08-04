import React, { Fragment, useRef, useState } from "react";

import styles from "./RepeatPassword.module.css";

const RepeatPassword = (props) => {

    const [samePasswords, setSamePasswords] = useState();

    const inputPasswordRef = useRef();
    const inputRePasswordRef = useRef();

    let inputClasses = "input";

    if (!samePasswords) {
        inputClasses += ` error-input`;
    } else {
        inputClasses += ` ok-input`;
    }

    const changeHandler = () => {

        const enteredPassword = inputPasswordRef.current.value;
        const enteredRePassword = inputRePasswordRef.current.value;

        if (enteredPassword !== enteredRePassword) {
            setSamePasswords(false);
        } else {
            setSamePasswords(true)
            props.passwordHandler(enteredPassword);
        }
    }

    return (
        <Fragment>
            <section className={styles["input-section"]}>
                <label htmlFor="password">Nueva Contraseña</label>
                <input
                ref={inputPasswordRef}
                id="password"
                type="password"
                name="password"
                onChange={changeHandler}
                className={inputClasses}
                />
            </section>
            <section className={styles["input-section"]}>
                <label htmlFor="rePassword">Repetir Contraseña</label>
                <input
                ref={inputRePasswordRef}
                id="rePassword"
                type="password"
                name="rePassword"
                onChange={changeHandler}
                className={inputClasses}
                />
            </section>
        </Fragment>
    )
}

export default RepeatPassword;