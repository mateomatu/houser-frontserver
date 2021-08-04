import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import RepeatPassword from "../../UI/RepeatPassword";
import AuthService, { AuthContext } from "../../../services/User/User-service";
import useToastContext from "../../../hooks/useToastContext";

import styles from "./ChangePassword.module.css";
import Loader from "../../UI/Loader";

const ChangePassword = () => {

    const [isLoading, setIsLoading] = useState(false);
    const authCtx = useContext(AuthContext);
    const addToast = useToastContext();

    let password = "";
    let errorMsg = "";

    const getNewPassword = (pwd) => {
        password = pwd;
    }
    
    const submitNewPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const idUser = authCtx.user.id_user
        const enteredPassword = password;

        
        if (enteredPassword !== null && enteredPassword !== "" && enteredPassword !== undefined) {
            (async () => {
                const response = await AuthService.getUserData(idUser);
                const userData = {
                    ...response,
                    password: enteredPassword
                }

                const res = await AuthService.editPassword(userData);
                if (res.success) {
                    setIsLoading(false);
                    addToast(`✅ Se ha editado la contraseña con éxito`);
                } else {
                    setIsLoading(false);
                    addToast(`⛔ Ha ocurrido un error, intenta más tarde`)    
                }
    
            })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
            
           
        }
    }

    return (
        <section className={styles.profile}>
            <section className={styles['profile-data']}>
                <Link to="/profile" className="primary-color bold">{"< Volver"}</Link>
                <h2 className="mt-4 mb-2">Cambiar contraseña</h2>
                { !isLoading && <form onSubmit={submitNewPassword} className={styles["login-form"]}>
                    <RepeatPassword passwordHandler={getNewPassword} errorMsg={errorMsg}></RepeatPassword>
                    <button className="gibson-medium">Confirmar</button>
                </form>}
                { isLoading && <Loader />}
            </section>
        </section>
    );
}

export default ChangePassword