import React, { useState, useEffect } from "react";

import Loader from "../../UI/Loader";
import Houser from "./HouserCard";
import serviceServices from "../../../services/Services/Service-service";

import useToastContext from "../../../hooks/useToastContext";

const HousersList = (props) => {
    
    //TODO: Utilizar el ID del servicio para consultar a la tabla pivot los housers que pertenecen
    //a dicho servicio
    const [isLoading, setIsLoading] = useState(true);
    const [houserUsers, setHouserUsers] = useState([]);
    const addToast = useToastContext();
    const serviceId = props.serviceId;

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            const data = await serviceServices.bringHousersByService(serviceId);

            const loadedHousers = [];

            data.forEach(houser => {
                loadedHousers.push({
                    id: houser.id_user,
                    desc: houser.quote,
                    avatar: houser.avatar,
                    name: houser.name,
                    portrait: houser.portrait,
                    lastname: houser.lastname,
                    total_rating: houser.total_rating
                })
            });  
            
            setHouserUsers(loadedHousers);
            setIsLoading(false)
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
    }, [serviceId])

    const housers = houserUsers.map(houser=>{ return <Houser key={houser.id} service={serviceId} houser={houser} />});

    if (housers.length === 0) {
        //TODO: Componente de no hay housers por mostrar!
    }

    return (
        <ul className="housers-list">
            { !isLoading && housers}
            { isLoading && <Loader />}
        </ul>
    )
        

}

export default HousersList;