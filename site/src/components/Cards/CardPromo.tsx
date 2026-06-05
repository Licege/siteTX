import React, { CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'
import { promoType } from '../../types/types'
import altImg from '../../static/img/dish.svg'

interface IProps {
  promo: promoType
  variant?: 'card' | 'banner'
}

const CardPromo: React.FC<IProps> = ({ promo, variant = 'card' }) => {
  const history = useHistory()
  const openPromo = () => history.push(`/actions/${promo.id}`)

  if (variant === 'banner') {
    return (
      <div className='card_promo card_promo--banner'>
        <button type='button' className='card_promo-img-btn' onClick={openPromo}>
          <img src={promo.imageSrc || altImg} alt={promo.title} className='card_promo-img' />
        </button>
      </div>
    )
  }

  const style = {
    backgroundImage: `url(${promo.imageSrc || altImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } as CSSProperties

  return (
    <div className='card_promo'>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className='card_promo-img' style={style} onClick={openPromo} />
    </div>
  )
}

export default CardPromo
