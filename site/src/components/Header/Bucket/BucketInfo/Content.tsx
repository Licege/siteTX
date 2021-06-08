import React from 'react'
import { getDishesKey } from '../../../../plugins/helpers'
import { useBucketInfoContentLogic } from '../logic'
import { ContentWrapper, Count, Dish, DishTitle, ListDishes, Price, Remove } from './styles'
import { Plus, Subtract } from '../../../../styledComponents/atoms'

const Content = () => {
  const { order, orderedDished, increaseDishCount, reduceDishCount, changeDishCount, removeDish } = useBucketInfoContentLogic()

  return (
    <ContentWrapper>
      <ListDishes>
        {orderedDished.map((dish, key) => (
          <Dish key={key}>
            <DishTitle>{dish.title}</DishTitle>
            <Count>
              <Subtract onClick={() => reduceDishCount(dish)} />
              <input onChange={changeDishCount(dish)}
                     inputMode='numeric'
                     value={getDishesKey(order, dish.id, 'count')} />
              <Plus onClick={() => increaseDishCount(dish)} />
            </Count>
            <Price>
              {getDishesKey(order, dish.id, 'cost') * getDishesKey(order, dish.id, 'count') + ' ₽'}
            </Price>
            <div>
              <Remove onClick={() => removeDish(dish.id)} />
            </div>
          </Dish>
        ))}
      </ListDishes>
    </ContentWrapper>
  )
}

export default Content