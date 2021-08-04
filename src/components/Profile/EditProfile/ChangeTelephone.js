import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../../services/User/User-service";
import { AuthContext } from "../../../services/User/User-service";
import useToastContext from "../../../hooks/useToastContext";

import styles from "./ChangeTelephone.module.css";
import Loader from "../../UI/Loader";


const ChangeTelephone = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)

    const addToast = useToastContext();
    const authCtx = useContext(AuthContext);

    const inputTelephoneRef = useRef();

    const changeInputHandler = (e) => {
        if (e.target.value !== "") {
            setError(false);
        }
    }

    const submitNewAddress = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const idUser = authCtx.user.id_user;
        const enteredTelephone = inputTelephoneRef.current.value;

        if (enteredTelephone !== null && enteredTelephone !== "" && enteredTelephone !== undefined) {
            setError(false);
            (async () => {
                const response = await AuthService.getUserData(idUser);
                const userData = {
                    ...response,
                    telephone: enteredTelephone
                }

                const res = await AuthService.editTelephone(userData);
                if (res.success) {
                    setIsLoading(false);
                    addToast(`✅ Se ha editado el teléfono con éxito`);
                } else {
                    setIsLoading(false);
                    addToast(`⛔ Ha ocurrido un error, intenta más tarde`)    
                }
                

                authCtx.updateAuthState(userData);
    
            })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
        } else {
            setError(true)
            setIsLoading(false);
        }

    }

    return (
        <section className={styles.profile}>
            <section className={styles['profile-data']}>
                <Link to="/profile" className="primary-color bold">{"< Volver"}</Link>
                <h2 className="mt-4 mb-2">Cambiar teléfono</h2>
                { !isLoading && <form onSubmit={submitNewAddress} className={styles["login-form"]}>
                    <section className={styles["input-section"]}>
                        <label htmlFor="telephone">Nuevo teléfono</label>
                        <input className={`input ${error ? "error-input" : ""}`} onChange={changeInputHandler} ref={inputTelephoneRef} id="telephone" />
                    </section>
                    <button className="gibson-medium">Confirmar</button>
                </form>}
                { isLoading && <Loader />}
            </section>
        </section>
    );
}

export default ChangeTelephone