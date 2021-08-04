import React, { useEffect, useState, useContext, Fragment } from "react";

import OrdersHistoryList from "./OrdersHistoryList";
import Loader from "../UI/Loader";

import OrderService from "../../services/Orders/Order-service";
import { AuthContext } from "../../services/User/User-service";
import useToastContext from "../../hooks/useToastContext";

import styles from "./OrdersHistory.module.css";

const titleClass = `ml-2 ${styles['service-title']} pages-title gibson-semibold`;

const OrdersHistory = () => {

    const [orders, setOrders] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const authCtx = useContext(AuthContext);
    const addToast = useToastContext();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await OrderService.checkForOrders(authCtx.user.id_user);

            const loadedOrders = data

            const filteredNotifications = loadedOrders.filter(not => {
                return not.fk_order_state === 3 || not.fk_order_state === 5 || not.fk_order_state === 4;
            })
            
            setOrders(filteredNotifications);
            setIsLoading(false)
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
    }, [])

    return (
        <Fragment>
            <h2 className={titleClass}>HISTORIAL DE PEDIDOS</h2>
            { !isLoading && <OrdersHistoryList orders={orders} />}
            { isLoading && <Loader />}
        </Fragment>
    )
}

export default OrdersHistory;