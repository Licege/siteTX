import React from 'react'
import {Button} from 'react-bootstrap'
import DeliveryInformation from './DeliveryInformation'
import TableProductsPositions from './TableProductsPositions'

const DetailOfDelivery = ({order, showMenuModal}) => {
  return (
    <div className='delivery_info-detail'>
      <div className='delivery_info-detail-title'>
        Заказ
      </div>
      <DeliveryInformation order={order} />
      <TableProductsPositions order={order} />
      <div className='text-center'>
        <Button variant='secondary' onClick={showMenuModal}>Добавить позицию</Button>
      </div>
    </div>
  )
}

export default DetailOfDelivery