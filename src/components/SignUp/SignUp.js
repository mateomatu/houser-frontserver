import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import SignUpForm from "./SignUpForm";

import styles from "./SignUp.module.css";

const SignUp = () => {
    
    const titleClass = `${styles['register-title']} gibson-medium`;

    return (
        <Fragment>
            <section className={styles["login-section"]}>
                <h2 className={titleClass}>Registrarse</h2>
                <SignUpForm />
                <div className={`mt-3 ${styles["signup-text"]} gibson-regular`}>
                    <span>¿Ya tienes una cuenta?</span><Link to="/login" className="primary-color d-inlineblock ml-1">Inicia Sesión</Link>
                </div>
            </section>
        </Fragment>
    );
}

export default SignUp;