import React from "react";

import ServiceItem from "./ServiceItem";
import styles from "./ServicesList.module.css";

const ServicesList = props => {

    if (props.services.length === 0) {
        return <p className="ml-2">No se encontraron servicios</p>
    }

    const services = props.services.map(service => {
        return <ServiceItem key={service.id} service={service} />
    });

    return (
        <ul className={`ml-2 ${styles.services}`}>
            {services}
        </ul>
    )
}

export default ServicesList;