import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import OrderService from "../../services/Orders/Order-service";
import { AuthContext } from "../../services/User/User-service";

import styles from "./Navbar.module.css";

const Navbar = () => {

    const authCtx = useContext(AuthContext);

    const [hasNotifications, setHasNotifications] = useState(false);

        let popup = "";

        useEffect(() => {
            const interval = setInterval( async () => {
                const data = await OrderService.checkForOrders(authCtx.user.id_user);
                if (data.some(notification => notification.read_at === null)) {
                    setHasNotifications(true);
                } else {
                    setHasNotifications(false);
                }
            }, 2500)
            return () => {
                clearInterval(interval);
            }
        }, [])


        if (hasNotifications) {
            popup = 'has-notifications';
        }

    return (
            <nav className={styles.navbar}>
                <ul>
                    <li>
                        <NavLink activeClassName={styles.navActive} to={`/profile`}>
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 500 500" enableBackground="new 0 0 500 500">
                                <path d="M147.4,164.8c3.5,59,20.1,108.8,51,142.9c0,0,0.7,0.5,2.2,1.2l-7.7,28.5c15.8,12.9,35.6,20.6,57,20.6
                                s41.3-7.7,57-20.6l-7.2-28.7c1.1-0.6,1.6-1,1.6-1c37.8-41.4,54.2-106.2,51.5-182.6c-3.2-91.5-99.6-84.7-102.9-85
                                c-5.2,0.2-99.8-5.4-102.9,85c-0.4,11.7-0.4,23.3,0.1,34.4C147.2,161.3,147.3,163,147.4,164.8z"/>
                                <path d="M352.3,345.6c-25.1,29.4-61.5,48.2-102.3,48.2s-77.2-18.7-102.3-48.2C90.6,366.9,0,408.8,0,460H250H500
                                C500,408.8,409.3,366.9,352.3,345.6z"/>
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={styles.navActive} to="/home">
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                viewBox="0 0 500 500" enableBackground="new 0 0 500 500">
                                <path d="M267.6,59.9L250,42.3L0.1,292.2l35.2,35.2l40.5-40.5v170.9h104V345.4c0-40.5,31.6-73.5,70.3-73.5
                                c38.6,0,70.3,33.1,70.3,73.5v112.4h105.6V288.5l38.9,38.9l35.2-35.2L267.6,59.9z"/>
                            </svg>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={styles.navActive} className={`${styles.notifications} ${styles[popup]}`} to="/notifications">
                        <svg id="Layer_4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <path d="m21.379 16.913c-1.512-1.278-2.379-3.146-2.379-5.125v-2.788c0-3.519-2.614-6.432-6-6.92v-1.08c0-.553-.448-1-1-1s-1 .447-1 1v1.08c-3.387.488-6 3.401-6 6.92v2.788c0 1.979-.867 3.847-2.388 5.133-.389.333-.612.817-.612 1.329 0 .965.785 1.75 1.75 1.75h16.5c.965 0 1.75-.785 1.75-1.75 0-.512-.223-.996-.621-1.337z"/><path d="m12 24c1.811 0 3.326-1.291 3.674-3h-7.348c.348 1.709 1.863 3 3.674 3z"/>
                            </g>
                        </svg>
                        </NavLink>
                    </li>
                </ul>
            </nav>
    );
}

export default Navbar;