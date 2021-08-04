import React, { useState, useEffect, Fragment, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import AuthService, { AuthContext } from "../../../services/User/User-service";
import OrderService from "../../../services/Orders/Order-service";
import useToastContext from "../../../hooks/useToastContext";

import Loader from "../../UI/Loader";
import Map from "../../UI/Map"
import Star from "../../UI/Star";

import { API_IMGS } from "../../../constants/api";

import styles from "./HouserInfo.module.css";



const HouserInfo = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [houser, setHouser] = useState({});
    const [hasOrderPending, setHasOrderPending] = useState(false)

    const params = useParams();
    const houserId = params.houserId;
    const serviceId = params.serviceId;
    const authCtx = useContext(AuthContext)
    const addToast= useToastContext();


    useEffect(() => {
        (async () => {
            const data = await AuthService.getUserData(houserId);
            const orders = await OrderService.checkForOrders(authCtx.user.id_user);

            const houser = data;

            const hasOrder = orders.find( order => {
                return order.fk_houser == houserId && (order.fk_order_state == 1 || order.fk_order_state == 2);
            })

            if (hasOrder) {
                setHasOrderPending(true);
            } else {
                setHasOrderPending(false);
            }
            
            setHouser(houser);
            setIsLoading(false)
        })().catch(err => addToast("⛔ Ha ocurrido un error, intenta más tarde"))
        
    }, [houserId])
    
    let arrayStars = [];
    for (let i = 0; i < Math.round(houser.total_rating); i++) {
        arrayStars.push(i);
    }


    if (isLoading) {
        return <Loader />
    } else {
        return (
            <Fragment>
                <header className={styles['profile-header']}>
                    <Link to={`/services/${serviceId}/housers`}>
                    <svg className={`${styles['back-container']}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                        <g>
                            <g>
                                <path d="M250,0C111.932,0,0,111.926,0,250S111.932,500,250,500,500,388.074,500,250,388.067,0,250,0Zm0,469.365c-120.961,0-219.365-98.41-219.365-219.365,0-77.411,40.306-145.588,101.284-184.8A217.832,217.832,0,0,1,250,30.635c120.961,0,219.365,98.41,219.365,219.365S370.961,469.365,250,469.365Z"/>
                                <path d="M99.923,250l137.823,82.392V167.608Z" transform="translate(56.165)"/>
                            </g>
                        </g>
                    </svg>
                    </Link>

                    { houser.portrait !== undefined && houser.portrait !== null && <img className={styles['img-portrait']} src={`${API_IMGS}/${houser.portrait}`} alt={houser.alt}/>}
                    { houser.avatar !== undefined && <img className={styles.photo} src={`${API_IMGS}/${houser?.avatar}`} alt={`${houser.alt}`} />}
                </header>
                <section className="stars">
                <h2>{houser.name + " " + houser.lastname}</h2>
                    {arrayStars.map( star => <Star key={star} />)}
                </section>
                <section className={styles['houser-content']}>
                    <h2>Información General</h2>
                    <p>{houser.quote}</p>
                    <p className="mt-3"><b>Teléfono:</b> {houser.telephone}</p>
                    <p><b>Ubicación:</b> {houser.address}</p>
                    {/* <img className={styles['google-maps']} src={`${PUBLIC_PATH}/assets/imgs/address.png`} alt="google maps"></img> */}
                </section>
                <Map idHouser={houserId} address={houser.address}/>
                { !hasOrderPending && <Link to={`/ad/${houserId}/${serviceId}`} className={`${styles.hbutton} gibson-medium houser-button mb-5 button`}>Contactar Houser</Link>}
                { hasOrderPending && <p className={`mb-5 bold`}>Ya tienes una orden pendiente con el Houser</p>}
            </Fragment>
        );
    }

}

export default HouserInfo;