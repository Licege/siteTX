import React, { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'
import { promoType } from '../../types/types'
import altImg from '../../static/img/dish.svg'
// import { cropText } from '../../plugins/helpers';

interface IProps {
    promo: promoType
}

const showMore = (id: number | string, history: any) => () => history.push(`/actions/${id}`)

const CardPromo: React.FC<IProps> = ({ promo }) => {
  const style = {
    backgroundImage: `url(${promo.imageSrc || altImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } as CSSProperties

  const history = useHistory()

  return (
    <div className='card_promo'>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className='card_promo-img' style={style} onClick={showMore(promo.id, history)}/>
      {/* <div className='card-body card_promo__wrapper'> */}
      {/*  <div className='card_promo-title'>{promo.title}</div> */}
      {/*  /!* <div className='card_promo-description'>{cropText(promo.short_description, 60)}</div> *!/ */}
      {/*  <div className='card_promo-actions'> */}
      {/*    <Link to={`/actions/${promo.id}`}>Подробнее...</Link> */}
      {/*  </div> */}
      {/* </div> */}
    </div>
  )
}

export default CardPromo
