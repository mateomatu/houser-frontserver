import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

import { API_IMGS } from "../../constants/api";

import OrderService from "../../services/Orders/Order-service";
import useToastContext from "../../hooks/useToastContext";

import styles from "./NotificationItem.module.css";

const NotificationList = props => {

  const notification = props.order;
  const history = useHistory();
  const addToast = useToastContext();

  const clickNotificationHandler = () => {
    if (notification.read === null) {
      (async () => {
        const data = await OrderService.readNotification(notification.id);
        
        //Devuelve un success
        if (data.success) {
          history.push(`/notifications/chat/${notification.id}`);
        }
      })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
    } else {
      history.push(`/notifications/chat/${notification.id}`);
    }
  }
    

  //`/notifications/chat/${notification.id`

  return (
    <Fragment>
      <li onClick={clickNotificationHandler} className={`mb-2 flex align-center ${styles["notification-container"]} ${!notification.read ? styles["read"] : styles['no-read']}`}>
          <img
            className={styles.photo}
            src={`${API_IMGS}/${notification.houserAvatar}`}
            alt={`ahre`}
            />
          {!notification.read && (<p className={styles["notification-text"]}>
            Tienes un nuevo mensaje de {notification.houserName}
          </p>)}
          {notification.read && (<p className={styles["notification-text"]}>
            Mensaje de {notification.houserName}
          </p>)}
      </li>
{/*       <li className={`${styles["notification-container"]} ${styles["no-read"]}`}>
        <img
          className={styles.photo}
          src={`${API_IMGS}/gladys.jpg`}
          alt={`ahre`}
        />
        <p className={styles["notification-text"]}>
          Notificación ya leída ejemplo
        </p>
      </li> */}
    </Fragment>
  );
};

export default NotificationList;
