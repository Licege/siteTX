import React from 'react'
import { useMenuCardsLogic } from '../logic'
import CardDish from '../../../components/common/element/CardDish'

const Cards = () => {
  const { dishes, categories, redirectToEditDish, openDelModal } = useMenuCardsLogic()

  if (!dishes) return <div />

  return dishes.map(( dish, key ) =>
      <CardDish dish={dish}
                key={key}
                categories={categories}
                remove={openDelModal(dish.id)}
                detail={redirectToEditDish} />
    )

}

export default Cards