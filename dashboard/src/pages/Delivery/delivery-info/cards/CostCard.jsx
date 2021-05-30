import React from 'react'
import {CardWrapper, Item, Title} from '../../style'

const CostCard = ({ order = {} }) => {
  const { deliveryCost, price } = order

  return (
    <CardWrapper>
      <Title>Информация о стоимости</Title>
      <Item>{`Списано бонусов: 0 (В разработке)`}</Item>
      <Item>{`Начислено бонусов: 0 (В разработке)`}</Item>
      <Item>{`Стоимость доставки: ${deliveryCost} ₽`}</Item>
      <Item>{`Стоимость заказа: ${price} ₽`}</Item>
      <Item>{`Общая стоимость заказа: ${price + deliveryCost} ₽`}</Item>
    </CardWrapper>
  )
}

export default CostCard
