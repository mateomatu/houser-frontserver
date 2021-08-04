import React, { useContext } from "react";
import { PUBLIC_PATH } from "../../constants/api";
import { AuthContext } from "../../services/User/User-service";

//Constants
import { API_IMGS } from "../../constants/api";

import styles from "./Header.module.css";

const Header = props => {

    const authCtx = useContext(AuthContext);

    const onClickProfileButton = () => {
        props.onOpenSidebar(true);
    }

        return (
            <header className={styles['app-header']}>
            { authCtx.user.id_usuario !== null && <img onClick={onClickProfileButton} className={styles['burger-menu-img']} src={`${API_IMGS}/${authCtx.user.avatar}`} alt={`${authCtx.user.alt}`} />}
            <h1 id="logo">
                <img src={`${PUBLIC_PATH}/assets/logo180.png`} alt="logo"/>
            </h1>
        </header>
    )
}
    

export default Header;