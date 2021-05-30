import React from 'react'
import {Field} from 'react-final-form'
import {deliveryHD} from '../../../../plugins/hardData'
import {CardWrapper, Item, Title} from '../../style'

const DeliveryCard = () => {
  return (
    <CardWrapper>
      <Title>Информация о заказе</Title>
      <Item>
        <Field name='delivery_type' component='select' className="form-control">
          {Object.keys(deliveryHD.deliveryType).map(type =>
            <option value={type} key={type}>{deliveryHD.deliveryType[type]}</option>,
          )}
        </Field>
      </Item>
      <Item>
        <Field name='status' component='select' className="form-control"
               parse={value => parseInt(value, 10)}>
          {Object.keys(deliveryHD.status).map(status =>
            <option value={status} key={status}>{deliveryHD.status[status]}</option>,
          )}
        </Field>
      </Item>
      <Item className='delivery_info-block-card-item'>
        <Field name='payment_type' component='select' className="form-control">
          {Object.keys(deliveryHD.paymentType).map(status =>
            <option value={status} key={status}>{deliveryHD.paymentType[status]}</option>,
          )}
        </Field>
      </Item>
      <Item>
        <Field name='payment_status' component='select' className="form-control"
               parse={value => parseInt(value, 10)}>
          {Object.keys(deliveryHD.paymentStatuses).map(status =>
            <option value={status}
                    key={status}>{deliveryHD.paymentStatuses[status]}</option>,
          )}
        </Field>
      </Item>
    </CardWrapper>
  )
}

export default DeliveryCard