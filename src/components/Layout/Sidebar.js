import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import styles from "./Sidebar.module.css";

const Backdrop = props => {

    const closeBurger = () => {
        props.onCloseSidebar(false);
    }

    return (
        <div onClick={closeBurger} className={styles.backdrop}></div>
    )
}

const SidebarOverlay = props => {
    return (
        <div className={styles['burger-container']}>
            {props.children}
        </div>
    )
}

const Sidebar = props => {

    const portalElement = document.getElementById('overlays');

    const closeHandler = (close) => {
        props.closeSidebar(close);
    }

    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onCloseSidebar={closeHandler} />, portalElement)}
            {ReactDOM.createPortal(<SidebarOverlay>{props.children}</SidebarOverlay>, portalElement)}
        </Fragment>
    )
}

export default Sidebar;