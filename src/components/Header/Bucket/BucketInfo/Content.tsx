import React from 'react'
import { getDishesKey } from '../../../../plugins/helpers'
import { useBucketInfoContentLogic } from '../logic'

const Content = () => {
  const { order, orderedDished, increaseDishCount, reduceDishCount, changeDishCount, removeDish } = useBucketInfoContentLogic()

  return (
    <div className='shopping_cart-info-content'>
      <div className='shopping_cart-info-content-list'>
        {orderedDished.map(dish => (
          <div className='shopping_cart-info-content-list-item' key={dish.id}>
            <div className='shopping_cart-info-content-list-item-title'>{dish.title}</div>
            <div className='shopping_cart-info-content-list-item-count'>
              <span className='custom_subtract' onClick={() => reduceDishCount(dish)}/>
              <input className='shopping_cart-info-content-list-item-count-input'
                     onChange={changeDishCount(dish)}
                     inputMode='numeric'
                     value={getDishesKey(order, dish.id, 'count')}/>
              <span className='custom_add' onClick={() => increaseDishCount(dish)}/>
            </div>
            <div
              className='shopping_cart-info-content-list-item-price'>{getDishesKey(order, dish.id, 'cost') * getDishesKey(order, dish.id, 'count') + ' ₽'}</div>
            <div className='shopping_cart-info-content-list-item-remove'><span
              className='custom_close'
              onClick={() => removeDish(dish.id)} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Content