import React from 'react'
import {tsToDate} from '../../../plugins/helpers'

const DeliveryInformation = ({ order = {} }) => {
  const {
    address: {
      city,
      street,
      house,
      flat,
      floor,
      intercom
    },
    createdAt,
    timeDelivery,
    paymentType,
    oddMoney,
    comment
  } = order

  const address = 'г. ' + city + ', ' + street + (house ? ', д.' + house : ', номер дома не указан') + (flat ? ', кв. ' + flat : '') +
    (floor ? ', ' + floor + ' этаж' : '') + (intercom ? ', код домофона: ' + intercom : '')

  return (
    <div className='delivery_info-detail-info'>
      <div className='delivery_info-detail-info-item'>
        Адрес: {address}
      </div>
      <div className='delivery_info-detail-info-item'>
        Дата и время создания заказа: {tsToDate(createdAt, 'hh:mm dd MMMM YYYY')}
      </div>
      {timeDelivery && <div className='delivery_info-detail-info-item'>
        Дата и время доставки заказа: {tsToDate(timeDelivery, 'hh:mm dd MMMM YYYY')}
      </div>}
      {paymentType === 'cash' && oddMoney !== 0 &&
      <div className='delivery_info-detail-info-item'>
        Подготовить сдачу с: {oddMoney}
      </div>}
      {comment && <div>Комментарий к заказу: {comment}</div>}
    </div>
  )
}

export default DeliveryInformation