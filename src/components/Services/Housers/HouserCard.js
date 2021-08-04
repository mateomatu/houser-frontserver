import React from "react";
import { Link } from "react-router-dom";

import Star from "../../UI/Star";


import  { API_IMGS } from "../../../constants/api";

import styles from "./HouserCard.module.css";

const cardStlyes = `mb-5 ${styles['houser-card']}`

const HouserCard = props => {
    
    const houser = props.houser;

    let arrayStars = [];
    for (let i = 0; i < Math.round(houser.total_rating); i++) {
        arrayStars.push(i);
    }
    
    return (
        <li>
            <Link to={`/houser/${houser.id}/${props.service}`}>
                <article className={cardStlyes}>
                    <header className={styles['profile-header']}>
                        { houser.portrait !== undefined && houser.portrait !== null && <img className={styles['img-portrait']} src={`${API_IMGS}/${houser.portrait}`} alt={houser.alt}/>}
                        <img className={styles['houser-avatar']} src={`${API_IMGS}/${houser.avatar}`} alt={houser.alt}/>
                    </header>
                    <h3>{houser.name + " " + houser.lastname}</h3>
                    <section className={styles.valoration}>
                        {arrayStars.map( star => <Star key={star} />)}
                        {arrayStars.length === 0 ?  <div className="flex align-center justify-center"><Star nostar={true} /><p className={styles.nostarp}><b>Sin valoración</b></p></div> : ""}
                    </section>
                    <p className={styles['houser-desc']}>
                        {houser.desc}
                    </p>
                </article>
            </Link>
        </li>
    )
}

export default HouserCard;