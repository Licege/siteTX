import React from 'react'
import {CardWrapper, Item, Title} from '../../style'

const CustomerCard = ({order = {}}) => {
  const {name, email, phone, userId} = order

  return (
    <CardWrapper>
      <Title>Информация о покупателе</Title>
      <Item>{name}</Item>
      <Item>
        {email ?
          <a href={'mailto:' + email}>{email}</a> : 'не указан'}
      </Item>
      <div className='delivery_info-block-card-item'>
        <a href={'tel:' + phone}>{phone}</a>
      </div>
      <div className='delivery_info-block-card-item'>
        {userId ? 'Сделать ссылку на пользователя' : 'Не зарегистрирован'}
      </div>
    </CardWrapper>
  )
}

export default CustomerCard