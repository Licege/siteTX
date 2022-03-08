import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { IOrder } from '../../types/types'
import OrderForm from './FormOrder'
import { orderAPI } from '../../api/api'
import img from '../../static/img/order_table.jpg'
import { PageContainer, PageTitle } from '../../components/core'
import { BREAKPOINTS } from '../../styledComponents/helpers'


const Order: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onSubmit = (order: IOrder) => {
    const date = { ...order }
    if (typeof date.orderDate !== 'string') {
      date.orderDate = date.orderDate.toISOString()
    }
    orderAPI.postOrder(date)
  }

  return (
    <PageContainer>
      <Helmet title='Заказ столов' />
      <PageTitle>~ Бронирование столов ~</PageTitle>
      <Body>
        <Image src={img} alt="" />
        <Content>
          <p>Описание тут</p>
          <OrderForm onSubmit={onSubmit} />
        </Content>
      </Body>
    </PageContainer>
  )
}

const Body = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${BREAKPOINTS.ml}px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`

const Image = styled.img`
    border-radius: 5px;
    width: 45%;
    margin: 20px 40px;
    user-select: none;

    @media (max-width: ${BREAKPOINTS.ml}px) {
        width: 90%;
        margin: 8px auto;
    }
`

const Content = styled.div`
    @media (max-width: ${BREAKPOINTS.ml}px) {
        margin: 0 auto;
    }
  
  @media (max-width: ${BREAKPOINTS.ts}px) {
    width: 100%;
  }
`

export default Order
