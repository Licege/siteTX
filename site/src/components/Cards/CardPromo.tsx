import React, { CSSProperties, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { promoType } from '../../types/types'
import altImg from '../../static/img/dish.svg'

interface IProps {
  promo: promoType
  variant?: 'card' | 'grid'
}

const WIDE_IMAGE_RATIO = 1.4

const CardPromo: React.FC<IProps> = ({ promo, variant = 'card' }) => {
  const history = useHistory()
  const [isWide, setIsWide] = useState(false)
  const openPromo = () => history.push(`/actions/${promo.id}`)

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget

    if (naturalHeight > 0 && naturalWidth / naturalHeight >= WIDE_IMAGE_RATIO) {
      setIsWide(true)
    }
  }

  if (variant === 'grid') {
    const className = `card_promo card_promo--grid${isWide ? ' card_promo--wide' : ''}`

    return (
      <div className={className}>
        <button type='button' className='card_promo-img-btn' onClick={openPromo}>
          <img src={promo.imageSrc || altImg} alt={promo.title} className='card_promo-img' onLoad={handleImageLoad} />
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
