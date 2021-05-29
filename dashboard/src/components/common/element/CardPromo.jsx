import React from 'react'
import altImg from '../../../static/img/dish.svg'
import { Link } from 'react-router-dom'

export const CardPromo = ({ promo }) => {
    const { id, title, shortDescription = '', imageSrc } = promo

    const style = {
        backgroundImage: `url(${imageSrc || altImg})`,
        backgroundSize: 'cover',
    }

    return (
        <div className='card card_promo'>
            <div className='card_promo-img' style={style}/>
            <div className='card-body card_promo__wrapper'>
                <div className='card_promo-title'>{title}</div>
                <div className='card_promo-description'>{shortDescription}</div>
                <div className='card_promo-actions'>
                    <Link to={`/promos/edit/${id}`}>Изменить</Link>
                </div>
            </div>
        </div>
    )
}
