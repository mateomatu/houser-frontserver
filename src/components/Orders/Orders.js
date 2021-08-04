import React, { useEffect, useState, useContext } from "react";

import OrdersList from "./OrdersList";
import Loader from "../UI/Loader";

import { AuthContext } from "../../services/User/User-service";
import OrderService from "../../services/Orders/Order-service";
import useToastContext from "../../hooks/useToastContext";

import styles from "./Orders.module.css";


const Orders = () => {

    const [orders, setOrders] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const authCtx = useContext(AuthContext);
    const addToast = useToastContext();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await OrderService.checkForOrders(authCtx.user.id_user);

            const loadedOrders = data.filter(order => {
                return order.fk_order_state === 2 || order.fk_order_state === 4;
            })
            
            loadedOrders.sort((a,b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            })
            
            
            setOrders(loadedOrders);
            setIsLoading(false)
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
    }, [])

    const titleClass = 'pages-title gibson-semibold';

    return (
        <section className={`${styles.orders}`}>
            <h2 className={"ml-2 " + titleClass}>PEDIDOS ACTIVOS</h2>
            { !isLoading && <OrdersList orders={orders} />}
            { isLoading && <Loader />}
            { orders?.length === 0 && !isLoading && <p className="ml-2">No hay pedidos activos</p>}
        </section>
    );
}

export default Orders;