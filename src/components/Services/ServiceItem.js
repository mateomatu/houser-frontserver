import React from "react";
import { Link } from "react-router-dom";
import { PUBLIC_PATH } from "../../constants/api";

import styles from "./ServiceItem.module.css";

const ServiceItem = props => {

    const service = props.service;

    return (
        <li className={styles['service-item']}>
            <Link className={styles['service-link']} to={`/services/${service.id}/housers`}> 
                <h3>{props.service.title}</h3>
                <img src={`${PUBLIC_PATH}/assets/imgs/${service.img}`} alt={service.alt} />
            </Link>
        </li>
    )
}

export default ServiceItem;