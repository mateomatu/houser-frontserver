import React, { Fragment } from "react";

import { Link } from "react-router-dom";

import styles from "./ContactHouserOK.module.css";

const ContactHouserOK = () => {
  return (
    <Fragment>
      <section className={styles["contact-houser-ok-content"]}>
        <h2>¡Tu solicitud de contacto ha sido enviada!</h2>
        <p>Nuestro Houser te responderá cuando vea tu mensaje</p>
        <svg
          className={styles["contact-houser-ok-svg"]}
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 32 32"
        >
          <path
            d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M13.52,23.383
                  L6.158,16.02l2.828-2.828l4.533,4.535l9.617-9.617l2.828,2.828L13.52,23.383z"
          />
        </svg>
      </section>
      <Link to="/" className={`${styles["contact-houser-button"]} gibson-medium houser-button button`}>
        Volver al inicio
      </Link>
    </Fragment>
  );
};

export default ContactHouserOK;
