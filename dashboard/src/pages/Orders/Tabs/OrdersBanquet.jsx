import React from 'react'
import { Table } from 'react-bootstrap'
import { tsToDate } from '../../../plugins/helpers'

const OrdersBanquet = ({ ordersBanquet }) => {
  return (
    <div className="card">
      <div className="card-body">
        <Table responsive>
          <thead className="table-thread">
          <tr>
            <th>Дата бронирования</th>
            <th>Бронь</th>
            <th>Посетитель</th>
            <th>Телефон</th>
            <th>Кол-во персон</th>
            <th>Пожелания</th>
          </tr>
          </thead>
          <tbody>
          {ordersBanquet.map(orderBanquet => (
            <tr key={orderBanquet._id}>
              <th>{tsToDate(orderBanquet.order_date, 'hh:mm dd:MM:YYYY')}</th>
              <th>{tsToDate(orderBanquet.create_at, 'hh:mm dd:MM:YYYY')}</th>
              <th>{orderBanquet.name}</th>
              <th>{orderBanquet.phone}</th>
              <th>{orderBanquet.count_person}</th>
              <th>{orderBanquet.comment}</th>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default OrdersBanquet
