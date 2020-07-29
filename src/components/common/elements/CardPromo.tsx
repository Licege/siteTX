import React, { CSSProperties } from 'react'
import { promoType } from '../../../types/types'
import { fullLink } from '../../../plugins/helpers'
import altImg from '../../../static/img/dish.svg'
import { useHistory } from 'react-router-dom'

interface IProps {
    promo: promoType
}

const showMore = ( id: string, history: any ) => {
    return () => {
        return history.push(`/actions/${id}`)
    }
}

const CardPromo: React.FC<IProps> = ( {promo} ) => {
    const style = {
        backgroundImage: `url(${promo.imageSrc ? fullLink(promo.imageSrc) : altImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } as CSSProperties

    let history = useHistory()

    return (
        <div className='card_promo'>
            <div className='card_promo-img' style={style} onClick={showMore(promo._id, history)}/>
            {/*<div className='card-body card_promo__wrapper'>*/}
            {/*    <div className='card_promo-title'>{promo.title}</div>*/}
            {/*    <div className='card_promo-description'>{cropText(promo.short_description, 60)}</div>*/}
            {/*    <div className='card_promo-actions'>*/}
            {/*        <Link to={'/actions/' + promo._id}>Подробнее...</Link>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export default CardPromo
