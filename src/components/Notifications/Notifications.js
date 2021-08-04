import React, { Fragment, useState, useContext, useEffect } from "react";
import NotificationList from "./NotificationList";

import OrderService from "../../services/Orders/Order-service";
import { AuthContext } from "../../services/User/User-service";
import useToastContext from "../../hooks/useToastContext";

import Loader from "../UI/Loader";


const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const addToast = useToastContext();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await OrderService.checkForOrders(authCtx.user.id_user);

            const loadedOrders = [];

            data.forEach(notification => {
                loadedOrders.push({
                    creationDate: notification.created_at,
                    idHouser: notification.fk_houser,
                    houserMsg: notification.houser_message,  
                    id: notification.id_order,
                    houserName: notification.name,
                    read: notification.read_at,
                    state: notification.state,
                    fkOrderState: notification.fk_order_state,
                    serviceTitle: notification.title,
                    userMsg: notification.user_message,
                    houserAvatar: notification.avatar
                })
            });

            const filteredNotifications = loadedOrders.filter(not => {
                return not.fkOrderState === 1;
            })
            
            filteredNotifications.sort((a,b) => {
                return new Date(b.creationDate) - new Date(a.creationDate);
            })
            
            
            setNotifications(filteredNotifications);
            setIsLoading(false)
            
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
    }, [])

    return (
        <Fragment>
            <h2 className={"ml-2 pages-title gibson-semibold"}>NOTIFICACIONES</h2>
            { !isLoading && <NotificationList notifications={notifications} />}
            { isLoading && <Loader />}
            { !isLoading && notifications?.length === 0 && <p className="ml-2">No tienes notificaciones</p>}
        </Fragment>
    );

}

export default Notifications;