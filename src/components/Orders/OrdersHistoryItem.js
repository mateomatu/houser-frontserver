import React, { useState } from "react";

import { API_IMGS } from "../../constants/api";

import Loader from "../UI/Loader";

import OrderService from "../../services/Orders/Order-service";
import useToastContext from "../../hooks/useToastContext";

import styles from "./OrdersHistoryItem.module.css";

const OrdersHistoryItem = props => {
    const order = props.order;
    const [state, setState] = useState(order.fk_order_state);
    const [isLoading, setIsLoading] = useState(false);
    const addToast = useToastContext();

    let formatter = new Intl.DateTimeFormat("es-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
      });


    const rating = (order, rate) => {
        (async () => {
          setIsLoading(true);
          const data = await OrderService.rateHouser(order.id_order, rate);
          
          if (data.success) {
            setIsLoading(false);
            addToast(`✅ Has valorado ${rate}⭐ exitosamente`);
          } else {
            setIsLoading(false);
            addToast(`⛔ Ha ocurrido un error, intenta más tarde`)    
            }

          setIsLoading(false);
          setState(5);
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
      }

    return (
        <li>
            <p className={styles.dateformat}>{formatter.format(Date.parse(order.updated_at))}</p>
            <section className={`mb-5 ${styles['houser-card']}`}>
                <header className={`${styles['profile-header']} ${styles.pending} ${order.fk_order_state === 3 ? styles.canceled : styles.completed}`}>
                    <img className={styles['houser-avatar']} src={`${API_IMGS}/${order.avatar}`} alt="are"/>    
                </header>
                { !isLoading && <section className={styles['houser-card-content']}>
                <h3>{order.name + " " + order.lastname}</h3>
                { state === 4 && <p className={`mt-2`}>Valora el trabajo del houser</p>}
                { state === 4 && (
                    <ul className={'flex justify-center mb-2'}>
                    <li className={styles.rate}>
                        1
                        <svg onClick={() => rating(order, 1)} className={styles.star} version="1.1" x="0px" y="0px" viewBox="0 0 500 500">
                            <g>
                                <path d="M485.2,232.4c0.3-0.3,0.1-0.5-0.1-0.5l-142.5-20.6c-0.4,0-0.8-0.4-0.9-0.6L278,81.4
                                    c-0.1-0.3-0.4-0.3-0.5,0l-63.7,129.2c-0.1,0.3-0.5,0.6-0.9,0.6L70.2,231.9c-0.4,0-0.4,0.3-0.1,0.5l103.1,100.6
                                    c0.3,0.3,0.4,0.8,0.4,1l-24.3,142c0,0.4,0.1,0.5,0.5,0.4l127.4-67c0.3-0.1,0.8-0.1,1.1,0l127.4,67c0.3,0.1,0.5,0,0.5-0.4
                                    l-24.4-142c0-0.4,0.1-0.8,0.4-1L485.2,232.4z"/>
                            </g>
                        </svg>
                    </li>
                    <li className={styles.rate}>
                        2
                        <svg onClick={() => rating(order, 2)} className={styles.star} version="1.1" x="0px" y="0px" viewBox="0 0 500 500">
                            <g>
                                <path d="M485.2,232.4c0.3-0.3,0.1-0.5-0.1-0.5l-142.5-20.6c-0.4,0-0.8-0.4-0.9-0.6L278,81.4
                                    c-0.1-0.3-0.4-0.3-0.5,0l-63.7,129.2c-0.1,0.3-0.5,0.6-0.9,0.6L70.2,231.9c-0.4,0-0.4,0.3-0.1,0.5l103.1,100.6
                                    c0.3,0.3,0.4,0.8,0.4,1l-24.3,142c0,0.4,0.1,0.5,0.5,0.4l127.4-67c0.3-0.1,0.8-0.1,1.1,0l127.4,67c0.3,0.1,0.5,0,0.5-0.4
                                    l-24.4-142c0-0.4,0.1-0.8,0.4-1L485.2,232.4z"/>
                            </g>
                        </svg>
                    </li>
                    <li className={styles.rate}>
                        3
                        <svg onClick={() => rating(order, 3)} className={styles.star} version="1.1" x="0px" y="0px" viewBox="0 0 500 500">
                            <g>
                                <path d="M485.2,232.4c0.3-0.3,0.1-0.5-0.1-0.5l-142.5-20.6c-0.4,0-0.8-0.4-0.9-0.6L278,81.4
                                    c-0.1-0.3-0.4-0.3-0.5,0l-63.7,129.2c-0.1,0.3-0.5,0.6-0.9,0.6L70.2,231.9c-0.4,0-0.4,0.3-0.1,0.5l103.1,100.6
                                    c0.3,0.3,0.4,0.8,0.4,1l-24.3,142c0,0.4,0.1,0.5,0.5,0.4l127.4-67c0.3-0.1,0.8-0.1,1.1,0l127.4,67c0.3,0.1,0.5,0,0.5-0.4
                                    l-24.4-142c0-0.4,0.1-0.8,0.4-1L485.2,232.4z"/>
                            </g>
                        </svg>
                    </li>
                    <li className={styles.rate}>
                        4
                        <svg onClick={() => rating(order, 4)} className={styles.star} version="1.1" x="0px" y="0px" viewBox="0 0 500 500">
                            <g>
                                <path d="M485.2,232.4c0.3-0.3,0.1-0.5-0.1-0.5l-142.5-20.6c-0.4,0-0.8-0.4-0.9-0.6L278,81.4
                                    c-0.1-0.3-0.4-0.3-0.5,0l-63.7,129.2c-0.1,0.3-0.5,0.6-0.9,0.6L70.2,231.9c-0.4,0-0.4,0.3-0.1,0.5l103.1,100.6
                                    c0.3,0.3,0.4,0.8,0.4,1l-24.3,142c0,0.4,0.1,0.5,0.5,0.4l127.4-67c0.3-0.1,0.8-0.1,1.1,0l127.4,67c0.3,0.1,0.5,0,0.5-0.4
                                    l-24.4-142c0-0.4,0.1-0.8,0.4-1L485.2,232.4z"/>
                            </g>
                        </svg>
                    </li> 
                    <li className={styles.rate}>
                        5
                        <svg onClick={() => rating(order, 5)} className={styles.star} version="1.1" x="0px" y="0px" viewBox="0 0 500 500">
                            <g>
                                <path d="M485.2,232.4c0.3-0.3,0.1-0.5-0.1-0.5l-142.5-20.6c-0.4,0-0.8-0.4-0.9-0.6L278,81.4
                                    c-0.1-0.3-0.4-0.3-0.5,0l-63.7,129.2c-0.1,0.3-0.5,0.6-0.9,0.6L70.2,231.9c-0.4,0-0.4,0.3-0.1,0.5l103.1,100.6
                                    c0.3,0.3,0.4,0.8,0.4,1l-24.3,142c0,0.4,0.1,0.5,0.5,0.4l127.4-67c0.3-0.1,0.8-0.1,1.1,0l127.4,67c0.3,0.1,0.5,0,0.5-0.4
                                    l-24.4-142c0-0.4,0.1-0.8,0.4-1L485.2,232.4z"/>
                            </g>
                        </svg>
                    </li>
                    </ul>
                )}
                <p className={styles.service}>{order.title}</p>
                { state === 3 &&<p className={`${styles.service}`}>Has <span className={ `text-danger`}>Cancelado</span> este pedido</p>}
                { state === 4 &&<p className={`${styles.service}`}>Pedido <span className={`text-success`}>Completado</span></p>}
                { state === 5 &&<p className={`${styles.service}`}>Has <span className={`text-success`}>Valorado</span> este pedido</p>}
                </section>}
                { isLoading && <Loader />}
            </section>
        </li>
    )
}

export default OrdersHistoryItem;