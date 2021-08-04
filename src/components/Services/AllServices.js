import React, { useState, useEffect, Fragment } from "react";
import serviceService from "../../services/Services/Service-service";
import { Link } from "react-router-dom";

import useToastContext from "../../hooks/useToastContext";

import Loader from "../UI/Loader";

import { PUBLIC_PATH } from "../../constants/api";

import styles from "./AllServices.module.css";

const AllServices = () => {

    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const titleClass = `ml-2 ${styles['service-title']} pages-title gibson-semibold`;
    const addToast = useToastContext();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await serviceService.allServices();

            const loadedServices = [];

            data.forEach(service => {
                loadedServices.push({
                    id: service.id_service,
                    title: service.title,
                    img: service.img,  
                    alt: service.alt
                })
            });        
            
            setServices(loadedServices);
            setIsLoading(false)
        })().catch(err => addToast("⛔ Ha ocurrido un error"))
    }, [])

    return (
        <Fragment>
            <h2 className={titleClass}>TODOS LOS SERVICIOS</h2>
            { isLoading && <Loader />}
            { !isLoading && (
                <ul className={`ml-2 ${styles.services}`}>
                    {services.map(service => { 
                        return (
                        <li key={service.id} className={styles['service-item']}>
                            <Link className={styles['service-link']} to={`/services/${service.id}`}> 
                                <h3>{service.title}</h3>
                                <img src={`${PUBLIC_PATH}/assets/imgs/${service.img}`} alt={service.alt} />
                            </Link>
                        </li>)
                    })}
                </ul>
            )}
        </Fragment>
        
        )
}

export default AllServices;