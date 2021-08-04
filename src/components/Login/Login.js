import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";

import styles from "./Login.module.css";

const Login = () => {

    const [titleClass, setTitleClass] = useState('gibson-medium')

    const failLogin = (data) => {
        if (!data) {
            setTitleClass('gibson-medium')
        } else {
            setTitleClass(styles['fail-login']);
        }
    }


    return (
        <Fragment>
            <section className={styles["login-section"]}>
                <h2 className={titleClass}>Iniciar Sesión</h2>
                <LoginForm addFailAnimation={failLogin} />
                <div className={`mt-3 ${styles["signup-text"]} gibson-regular`}>
                    <span>¿Aún no tienes una cuenta?</span><Link to="/sign-up" className="link-primary d-inlineblock ml-1">Presiona aquí</Link>
                </div>
            </section>
        </Fragment>
    )
}

export default Login;