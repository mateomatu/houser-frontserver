import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HousersList from "../components/Services/Housers/HousersList";
import serviceServices from "../services/Services/Service-service";

import useToastContext from "../hooks/useToastContext";

const LookForHouserPage = () => {

    const [serviceTitle, setServiceTitle] = useState("");

    const params = useParams();
    const serviceId = params.serviceId;
    const addToast = useToastContext();

    useEffect(() => {
        (async () => {
            const data = await serviceServices.bringServiceById(serviceId);
            const title = data.title;
            setServiceTitle(title);
        })().catch(err => { addToast("⛔ Ha ocurrido un error, intenta más tarde")})
    }, [serviceId, serviceTitle])

    //TODO: Llamar a un API que me traiga los datos del servicio de houser

    const backgroundImage = `service-item-info`;
    const titleClass = 'pages-title gibson-semibold w-50';

    return (
    <section className={backgroundImage}>
        <h2 className={"ml-3 mb-5 mt-0 pt-5 " + titleClass}>{serviceTitle.toUpperCase()}</h2>
        <HousersList serviceId={serviceId} />
    </section>
    )
}

export default LookForHouserPage;