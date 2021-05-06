import React from 'react'
import { fullLink, getDishesKey } from '../../../plugins/helpers'
import altImg from '../../../static/img/dish.svg'
import { useBucketOrderTableLogic } from './logic'

const OrderTable = () => {
  const { dishes, order, increaseDishCount, reduceDishCount, changeDishCount, removeDish } = useBucketOrderTableLogic()

  return (
    <div className="bucket-table">
      {dishes.map(dish => (
        <div className="bucket-table-row" key={dish.id}>
          <img className="bucket-table-row-img"
               src={dish.imageSrc || altImg} alt=""
          />
          <div className="bucket-table-row-info">
            <div className="bucket-table-row-info-title">{dish.title}</div>
            <div className="bucket-table-row-info-count">
              <span className="custom_subtract" onClick={() => reduceDishCount(dish)} />
              <input className="bucket-table-row-info-count-input" onChange={changeDishCount(dish)}
                     inputMode="numeric"
                     value={getDishesKey(order, dish.id, 'count')}
              />
              <span className="custom_add" onClick={() => increaseDishCount(dish)} />
            </div>
            <div
              className="bucket-table-row-info-ceil"
            >{getDishesKey(order, dish.id, 'cost') * getDishesKey(order, dish.id, 'count') + ' ₽'}</div>
          </div>
          <div><span className="bucket-table-row-remove custom_close"
                     onClick={() => removeDish(dish.id)}
          /></div>
        </div>
      ))}
    </div>
  )
}

export default OrderTable