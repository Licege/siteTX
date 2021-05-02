import React from 'react'
import { useMenuCardsLogic } from '../logic'
import CardDish from '../../../components/common/elements/CardDish'

const Cards = (): JSX.Element => {
  const { dishes, categories, order, addDishToBucket, increaseDishCount, reduceDishCount } = useMenuCardsLogic()

  return (
    <div className='menu-wrapper-content'>
      {dishes.map(dish => <CardDish dish={dish}
                                    categories={categories}
                                    order={order}
                                    addToBucket={addDishToBucket}
                                    increaseCountDish={increaseDishCount}
                                    reduceCountDish={reduceDishCount}
                                    key={dish.id} />
      )}
    </div>
  )
}

export default Cards