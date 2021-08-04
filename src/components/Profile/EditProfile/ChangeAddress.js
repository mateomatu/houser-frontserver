import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AuthService from "../../../services/User/User-service";
import { AuthContext } from "../../../services/User/User-service";
import useToastContext from "../../../hooks/useToastContext";

import styles from "./ChangeAddress.module.css";
import Loader from "../../UI/Loader";


const ChangeAddress = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const authCtx = useContext(AuthContext);
    const addToast = useToastContext();

    const inputAddressRef = useRef();

    const changeInputHandler = (e) => {
        if (e.target.value !== "") {
            setError(false);
        }
    }

    const submitNewAddress = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const idUser = authCtx.user.id_user
        const enteredAddress = inputAddressRef.current.value;

        
        if (enteredAddress !== null && enteredAddress !== "" && enteredAddress !== undefined) {
            setError(false);
            (async () => {
                const response = await AuthService.getUserData(idUser);
                const userData = {
                    ...response,
                    address: enteredAddress
                }

                const res = await AuthService.editAddress(userData);
                if (res.success) {
                    setIsLoading(false);
                    addToast(`✅ Se ha editado la dirección con éxito`);
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
                <h2 className="mt-4 mb-2">Cambiar Domicilio</h2>
                { !isLoading && <form onSubmit={submitNewAddress} className={styles["login-form"]}>
                    <section className={styles["input-section"]}>
                        <label htmlFor="address">Nuevo Domicilio</label>
                        <input className={`input ${error ? "error-input" : ""}`} onChange={changeInputHandler} ref={inputAddressRef} id="address" />
                    </section>
                    <button className="gibson-medium">Confirmar</button>
                </form>}
                { isLoading && <Loader />}
            </section>
        </section>
    );
}

export default ChangeAddress