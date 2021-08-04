import React, { Fragment } from "react";

import NotificationItem from "./NotificationItem";

import styles from "./NotificationList.module.css";

const NotificationList = props => {

    const notificationItems = props.notifications.map(order => {
        return <NotificationItem key={order.id} order={order} />
    })

    return (
        <Fragment >
            <ul className={styles['notification-list']}>
                {notificationItems}
            </ul>
        </Fragment>
    )
}

export default NotificationList;