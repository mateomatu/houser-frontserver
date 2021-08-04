import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Components 
import ServicesFilter from "./ServicesFilter";
import ServicesList from "./ServicesList";
import Loader from "../UI/Loader";

//Services
import serviceServices from "../../services/Services/Service-service";
import useToastContext from "../../hooks/useToastContext";

//Styles
import styles from "./Services.module.css";

const Services = () => {

    const [filteredService, setFilteredService] = useState("");
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const serviceFilterHandler = (filter) => {
        setFilteredService(filter);
    }

    const suggestions = ["mueble", "compu"];
    const addToast = useToastContext();

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await serviceServices.allServices();

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

    const titleClass = `ml-2 ${styles['service-title']} pages-title gibson-semibold`;
    const servicesFiltered = services.filter(service => {
/*         if (filteredService.toUpperCase().includes("PINTOR")) {
            return service.title === "Pinturería";
        }
        if (filteredService.toUpperCase().includes("MADERA") || filteredService.toUpperCase().includes("MUEBLE") || filteredService.toUpperCase().includes("CARPINTER") ) {
            return service.title === "Carpintería";
        }
        if (filteredService.toUpperCase().includes("AIRE")) {
            return service.title === "Aires acondicionados";
        }
        if (filteredService.toUpperCase().includes("PC") || filteredService.toUpperCase().includes("COMPU") || filteredService.toUpperCase().includes("NOTEBOOK")) {
            return service.title === "Técnico PC";
        } */
         return service.title.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(filteredService.toUpperCase()); 
        })
    return (
        <section>
            <ServicesFilter suggestions={suggestions} onFilterServices={serviceFilterHandler} />
            <h2 className={titleClass}>SERVICIOS</h2>
            <Link to="/home/all" className={styles['see-all']}>Ver todos</Link>
            { isLoading && <Loader />}
            { !isLoading && <ServicesList services={servicesFiltered} />}
        </section>
    );
}

export default Services; 