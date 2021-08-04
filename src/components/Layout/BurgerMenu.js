import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AuthService, { AuthContext } from "../../services/User/User-service";

import Sidebar from "./Sidebar";

//Constants
import { API_IMGS } from "../../constants/api";

import styles from "./BurgerMenu.module.css";

const BurgerMenu = props => {

    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const closeSidebarHandler = () => {
        props.onCloseSidebar(false);
    }

    const logoutHandler = async () => {
        await AuthService.logout();
        authCtx.updateAuthState({
            id_usuario: null,
            email: null,
        })
        props.onCloseSidebar(false);
        history.push('/login');
    }

    return (
        <Sidebar closeSidebar={closeSidebarHandler}>
            <section className={styles['burger-profile']}>
                { authCtx.user.avatar !== undefined && <img src={`${API_IMGS}/${authCtx.user.avatar}`} alt={`${authCtx.user.alt}`} />}
                <div className={styles['burger-profile-text']}>
                    <span>{authCtx.user.name}</span>
                    <span>{authCtx.user.lastname}</span>
                </div>
            </section>
            <nav className={styles['burger-nav']}>
                <ul>
                    <li className={`mb-2`}>
                    <svg className={styles['burger-nav-svg']} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 500 500" enableBackground="new 0 0 500 500">
                        <g>
                            <path d="M315.1,0H44v500H456V165.8v-24.5v-0.5L315.1,0z M314.8,34.2l107,107h-107L314.8,34.2L314.8,34.2z
                                M431.5,475.5H68.5v-451h221.7v141.3h141.3v309.7H431.5z"/>
                            <rect x="122.4" y="205.6" fill="#010101" width="255.2" height="24.5"/>
                            <rect x="122.4" y="115.5" fill="#010101" width="127.6" height="24.5"/>
                            <rect x="122.4" y="295.7" fill="#010101" width="255.2" height="24.5"/>
                            <rect x="122.4" y="385.9" fill="#010101" width="255.2" height="24.5"/>
                        </g>
                    </svg>
                        <Link onClick={closeSidebarHandler} to="/orders-history" >Historial Pedidos</Link>
                    </li>
                    <li>
                        <svg className={styles['burger-nav-svg']} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 500 500">
                            <path d="M392.3,224.6v-75.1C392.3,67.3,328.2,0,250,0S107.7,67.3,107.7,149.5v75.1H68.5v245
                            c0,16.7,15,30.4,33.5,30.4h296c18.4,0,33.5-13.7,33.5-30.4v-245H392.3z M259.2,368.9v34.7h-18.4v-34.7c-9.2-3.7-15.7-12.6-15.7-23.1
                            c0-13.7,11.2-24.9,24.9-24.9s24.9,11.2,24.9,24.9C274.9,356.3,268.4,365.3,259.2,368.9z M158.3,224.6v-75.1
                            c0-56.1,41.1-101.6,91.7-101.6s91.7,45.6,91.7,101.6v75.1H158.3z"/>
                        </svg>
                        <button onClick={logoutHandler}>Cerrar Sesión</button>
                    </li>
                </ul>
            </nav>
        </Sidebar>

    );
}

export default BurgerMenu;