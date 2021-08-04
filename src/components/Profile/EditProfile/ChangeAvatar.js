import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";

import styles from "./ChangeAvatar.module.css";

import AuthService, { AuthContext } from "../../../services/User/User-service";

const ChangeAvatar = () => {

    const [selectedFile, setSelectedFile] = useState();

    const inputFile = useRef(null);

    const authCtx = useContext(AuthContext);
    const userId = authCtx.user.id_user;

    const fileChangeHandler = (e) => {
        const imgFile = e.target.files[0]
        const reader = new FileReader();
        reader.addEventListener('load', function() {
            const codeImg = reader.result;
            setSelectedFile(codeImg);
        });
        reader.readAsDataURL(imgFile);
    }

    const uploadImageHandler = (event) => {
        event.preventDefault();
        console.log(selectedFile);
        (async () => {
            const response = await AuthService.getUserData(userId);
            const userData = {
                ...response,
                avatar: selectedFile
            }


            const res = await AuthService.editAvatar(userData);
            if (res.success) {
                //setIsLoading(false);
                console.log(`✅ Se ha editado la imágen con éxito`);
            } else {
               // setIsLoading(false);
                console.log(`⛔ Ha ocurrido un error, intenta más tarde`)    
            }

        })().catch(err => console.log("Hubo un error al traer las órdenes"))
    }

    return (
        <section className={styles.profile}>
            <section className={styles['profile-data']}>
                <Link to="/profile" className="primary-color bold">{"< Volver"}</Link>
                <h2 className="mt-4 mb-2">Cambiar imágen de perfil</h2>
                <form onSubmit={uploadImageHandler} encType="multipart/form-data">
                    <input className="form-control-file" type="file" id="imagen" ref={inputFile} onChange={fileChangeHandler} />
                    <label htmlFor="imagen" className="btn-2">Buscar foto</label>
                    <button className="gibson-medium">Confirmar</button>
                </form>
            </section>
        </section>
    );
}

export default ChangeAvatar