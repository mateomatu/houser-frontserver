import React, { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router";

import Loader from "../UI/Loader";

import NotificationMatch from "./NotificationMatch";

import OrderService from "../../services/Orders/Order-service";
import { AuthContext } from "../../services/User/User-service";

import { API_IMGS } from "../../constants/api";

import styles from "./NotificationChat.module.css";

const NotificationChat = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState({});

    const authCtx = useContext(AuthContext);

    const params = useParams();
    const notificationId = parseInt(params.orderId);


    useEffect(() => {
        fetchData().catch();
    }, [])

    const fetchData = async () => {
            const data = await OrderService.checkForOrders(authCtx.user.id_user);

            const notificationFinded = data.find(notif => {
                return notif.id_order === notificationId;
            })

            setNotification(notificationFinded);
            setIsLoading(false)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Fragment>
            <header className={styles['profile-header']}>
            { notification.portrait !== undefined && notification.portrait !== null && <img className={styles['img-portrait']} src={`${API_IMGS}/${notification.portrait}`} alt={notification.alt}/>}
            { notification.avatar !== undefined && <img className={styles.photo} src={`${API_IMGS}/${notification?.avatar}`} alt={`${notification.alt}`} />}
            </header>
            <section className={styles['message-container']}>
                <p className={styles['message-content']}>{notification.houser_message}</p>
                <p className={styles['message-content']}>Si quieres contactarte conmigo mi teléfono es: <b>{notification.telephone}</b></p>
            </section>
            <NotificationMatch notification={notification} />
        </Fragment>
    );
}

export default NotificationChat;