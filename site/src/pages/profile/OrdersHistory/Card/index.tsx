import React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ordersHistoryType } from '../../../../types/types'
import './style.scss'
import { parseAddress } from '../../../../plugins/helpers'
import { DeliveryTypeEnum, PaymentTypeEnum } from '../../../../dictionaries/delivery'
import { Button } from '../../../../components/core'
import styled from 'styled-components'

interface IProps {
  order: ordersHistoryType
}

const getDate = (date: Date) => {
  return format(date, 'd MMMM yyyy г. в HH:mm', {locale: ru})
}

const getTotalPrice = (price: number, deliveryCost: number) => {
  const totalPrice = price + deliveryCost
  return `Сумма ${totalPrice | 0} ₽`
}

const OrderHistoryCard = ({ order }: IProps) => {
  const { price, deliveryType, deliveryCost, address, createdAt, id, status, paymentType } = order

  return (
    <Container>
      <Body>
        <DateInfo>{getDate(new Date(createdAt))}</DateInfo>
        <AddressBlock>
          <div>{DeliveryTypeEnum[deliveryType]}</div>
          <div>{parseAddress(address)}</div>
        </AddressBlock>
        <div>
          <div>{PaymentTypeEnum[paymentType]}</div>
          <div>{getTotalPrice(price, deliveryCost)}</div>
        </div>
      </Body>
      <Footer>
        <Button variant="contained" color="primary" onClick={() => {
        }}
        >Повторить заказ</Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  width: 400px;
  height: 400px;
  background-color: bisque;
  padding: 20px;
  border-radius: 10px;
`

const Body = styled.div`
  height: 320px;
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
`

const DateInfo = styled.div`
  font-size: ${props => props.theme.font.size.normal};
  font-weight: 600;
`

const AddressBlock = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid #D7D7D7;
`

export default OrderHistoryCard