import React from "react";

import OrdersHistoryItem from "./OrdersHistoryItem";

const OrdersHistoryList = props => {

    const orders = props.orders;

    let order;
    if (orders) {
        order = orders.map(ord => {
            return <OrdersHistoryItem key={ord.id_order} order={ord} />
        })
    }

    return (
        <ul>
            {order}
        </ul>
    )
}

export default OrdersHistoryList;