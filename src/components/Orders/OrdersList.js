import React, { Fragment } from "react";
import OrderItem from "./OrderItem";

const OrdersList = props => {

    const orders = props.orders;


    let order;
    if (orders) {
        order = orders.map(ord => {
            return <OrderItem key={ord.id_order} order={ord} />
        })
    }

    return (
        <Fragment>
        <ul>
            {order}
        </ul>
        </Fragment>
    );
}

export default OrdersList;