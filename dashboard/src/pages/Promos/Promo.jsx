import React from 'react'
import {Button} from 'react-bootstrap'
import {useShowPromoLogic} from './logic'
import altImg from '../../static/img/dish.svg'
import {PageHeader} from '../../styledComponents/components'

const getStyle = image => ({
  backgroundImage: `url(${image || altImg})`,
  backgroundSize: 'cover'
})

const Promo = () => {
  const {promo, redirectToChangePromo, goBack} = useShowPromoLogic()

  if (!promo) return <div />

  const {title, description, image} = promo

  return (
    <div>
      <PageHeader title={`Редактирование акции ${title}`} />
      <div className="promo">
        <div className="promo-img" style={getStyle(image)} />
        <div className="promo__wrapper">
          <div className="promo__wrapper-content">
            <div className="promo-title">{title}</div>
            <div className="promo-description" dangerouslySetInnerHTML={{__html: description}} />
            <div>
              <Button variant="secondary" onClick={goBack}>Все акции</Button>
              <Button variant="link" onClick={redirectToChangePromo}>Изменить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Promo
