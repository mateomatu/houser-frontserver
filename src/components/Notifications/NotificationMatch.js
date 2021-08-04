import React, { useState, Fragment } from "react";

import OrderService from "../../services/Orders/Order-service";
import useToastContext from "../../hooks/useToastContext";

import styles from "./NotificationMatch.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Loader from "../UI/Loader";

const NotificationMatch = props => {

    const [state, setState] = useState(props.notification.fk_order_state);
    const [isLoading, setIsLoading] = useState(false);
    const addToast = useToastContext();

    const changeStateCancelHandler = () => {
        setIsLoading(true);

        const notification = props.notification;

        const orderId = notification.id_order;

        (async () => {
            const data = await OrderService.updateOrderState(orderId, 3);
            
            if (data) {
                
            }
            //Devuelve un success

            setIsLoading(false);
            setState(3);
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
    }

    const changeStateAcceptHandler = () => {
        setIsLoading(true);

        const notification = props.notification;

        const orderId = notification.id_order;

        (async () => {
            const data = await OrderService.updateOrderState(orderId, 2);

            if (data) {
                
            }
            //Devuelve un success
            
            setIsLoading(false);
            setState(2);
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Fragment>
            { state !== 3 && state !== 2 && (<section className={`mb-5 pb-3 ${styles['notification-match-container']}`}>
                <p className={`mb-2 gibson-semibold ${styles['notification-match-text']}`}>{props.notification.name} te ha envíado una solicitud para ser tu houser</p>
                <div className={styles['action-buttons']}>
                    <button onClick={changeStateCancelHandler} className={styles.cancel}><FontAwesomeIcon icon={faTimesCircle}/>Cancelar</button>
                    <button onClick={changeStateAcceptHandler} className={styles.confirm}><FontAwesomeIcon icon={faCheckCircle}/>Aceptar</button>
                </div>
            </section>)}
            { state === 3 && (<section className={`mb-5 pb-3 ${styles['notification-match-container-error']}`}>
                <p className={`mb-2 gibson-semibold ${styles['notification-match-text-error']}`}>Has rechazado la solicitud de {props.notification.name}</p>
                <div className={styles['action-buttons']}>
                    <FontAwesomeIcon icon={faTimesCircle}/>
                </div>
            </section>)}
            { state === 2 && (<section className={`mb-5 pb-3 ${styles['notification-match-container-ok']}`}>
                <p className={`mb-2 gibson-semibold ${styles['notification-match-text-ok']}`}>Has aceptado la solicitud de {props.notification.name}</p>
                <div className={styles['action-buttons']}>
                    <FontAwesomeIcon icon={faCheckCircle}/>
                </div>
            </section>)}
        </Fragment>
    )
}

export default NotificationMatch;