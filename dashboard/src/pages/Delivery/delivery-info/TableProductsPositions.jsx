import React from 'react'
import {Button, Table} from 'react-bootstrap'
import {useTableProductsPositionsLogic} from '../logic'
import altImg from '../../../static/img/dish.svg'

const TableProductsPositions = ({ order = {} }) => {
  const { dishes, increaseDish, decreaseDish, removeDish } = useTableProductsPositionsLogic()

  return (
    <div className='delivery_info-detail-table'>
      <Table responsive>
        <thead className='table-thread'>
        <tr className='text-center'>
          <th/>
          <th>Название</th>
          <th>Количество</th>
          <th>Цена за единицу</th>
          <th>Итого</th>
          <th/>
        </tr>
        </thead>
        <tbody>
        {order.list.map(dish => (
          <tr key={dish.id}>
            <td>
              <img
                src={dishes.find(item => item.id === dish.id)?.imageSrc || altImg}
                className='delivery_info-detail-table-img'
                alt='img'/>
            </td>
            <td>{dish.title}</td>
            <td>
              <Button variant='outline-info' onClick={decreaseDish(dish.id)}>-</Button>
              {dish.count}
              <Button variant='outline-info' onClick={increaseDish(dish.id)}>+</Button>
            </td>
            <td>{dish.cost} ₽</td>
            <td>{dish.cost * dish.count} ₽</td>
            <td><span onClick={removeDish(dish.id)}>Корзина</span></td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default TableProductsPositions