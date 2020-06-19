import React, {CSSProperties} from 'react'
import {promoType} from "../../../types/types";
import {cropText, fullLink} from "../../../plugins/helpers";
import altImg from "../../../static/img/dish.svg";
import {Link} from "react-router-dom";

interface IProps {
    promo: promoType
}

const CardPromo: React.FC<IProps> = ( {promo} ) =>{
    const style = {
        backgroundImage: `url(${promo.imageSrc ? fullLink(promo.imageSrc) : altImg})`,
        backgroundSize: "cover"
    } as CSSProperties

    return (
    <div className='card card_promo'>
        <div className='card_promo-img' style={style} />
        <div className='card-body card_promo__wrapper'>
            <div className='card_promo-title'>{promo.title}</div>
            <div className='card_promo-description'>{cropText(promo.short_description, 60)}</div>
            <div className='card_promo-actions'>
                <Link to={'/actions/' + promo._id}>Подробнее...</Link>
            </div>
        </div>
    </div>
)}

export default CardPromo