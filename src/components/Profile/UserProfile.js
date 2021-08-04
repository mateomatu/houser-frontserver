import React, { useContext } from "react";
import { Link, Switch, Route } from "react-router-dom";

//Constants
import { API_IMGS } from "../../constants/api"

//Components
import Loader from "../UI/Loader";

//Services
import { AuthContext } from "../../services/User/User-service";

//Styles
import styles from "./UserProfile.module.css";


const UserProfile = () => {
    
    const authCtx = useContext(AuthContext);

    return (
    <Switch>
        <Route path="/profile" exact>
            <section className={styles.profile}>
                <header className={styles['profile-header']}>
                    {/* <Link to="/profile/change-avatar"></Link> */}
                    { authCtx.user.avatar !== undefined && <img className={styles.photo} src={`${API_IMGS}/${authCtx.user.avatar}`} alt={`${authCtx.user.alt}`} />}
                    { authCtx.user.avatar === undefined && <Loader />}
                </header>
                <section className={styles['profile-data']}>
                    <ul>
                        <li className={styles['user-data']}>
                            <h3>Nombre y Apellido</h3>
                            <p>{authCtx.user.name + " " + authCtx.user.lastname}</p>
                        </li>
                        <li className={styles['user-data']}>
                            <h3>Email</h3>
                            <p>{authCtx.user.email}</p>
                        </li>
                        <li className={styles['user-data']}>
                            <Link to="/profile/change-address">
                                <div className={styles['user-info-item']}>
                                    <h3>Domicilio</h3>
                                    <p>{authCtx.user.address}</p>
                                </div>
                                <span className={styles['user-data-icon']}>{'>'}</span>
                            </Link>
                        </li>
                        <li className={styles['user-data']}>
                            <Link to="/profile/change-telephone">
                                <div className={styles['user-info-item']}>
                                    <h3>Teléfono</h3>
                                    <p>{authCtx.user.telephone}</p>
                                </div>
                                <span className={styles['user-data-icon']}>{'>'}</span>
                            </Link>
                        </li>
                        <li className={styles['user-data']}>
                            <Link to="/profile/change-password">
                                <div className={styles['user-info-item']}>
                                    <h3>Contraseña</h3>
                                    <p>***************</p>
                                </div>
                                <span className={styles['user-data-icon']}>{'>'}</span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </section>
        </Route>
        <Route path="/profile/change-address">

        </Route>
        <Route path="/profile/change-password">

        </Route>
    </Switch>
    );
}

export default UserProfile;