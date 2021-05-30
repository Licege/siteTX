import React from 'react'
import {format} from 'date-fns'
import {useDeliveryTableLogic} from '../../logic'
import {deliveryHD} from '../../../../plugins/hardData'

const TableContent = () => {
  const { orders, detail, prevent } = useDeliveryTableLogic()

  return (
    <tbody className='table-body'>
      {orders?.length ? orders.map(( order, key ) => (
        <tr key={key} onClick={detail(order.id)}>
          <td onClick={prevent}><a href={'tel:' + order.phone}>{order.phone}</a></td>
          <td onClick={prevent}>{`Товаров: ${order.list.reduce((acc, order) => acc + order.count, 0)}`}</td>
          <td>{order.price + order.deliveryCost} ₽</td>
          <td>{format(new Date(order.createdAt), 'HH:mm dd.MM.yyyy')}</td>
          <td>{deliveryHD.deliveryType[order.deliveryType]}</td>
          <td>{order.timeDelivery ? format(new Date(order.timeDelivery), 'HH:mm dd.MM.yyyy') : 'Не указано'}</td>
          <td>{deliveryHD.paymentType[order.paymentType]}</td>
          <td>{deliveryHD.status[order.status]}</td>
          <td>{deliveryHD.paymentStatuses[order.paymentStatus]}</td>
        </tr>)) : null
      }
    </tbody>
  )
}

export default TableContent