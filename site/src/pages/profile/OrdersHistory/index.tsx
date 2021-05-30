import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMyOrdersHistory } from '../../../redux/selectors/profile'
import { requestOrdersHistory } from '../../../redux/thunks/profile.thunks'
import OrderHistoryCard from './Card'
import './style.scss'
import styled from 'styled-components'

const OrdersHistory = () => {
    const orders = useSelector(getMyOrdersHistory)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestOrdersHistory())
    }, [])

    return (
        orders.length
            ? <Container>
                {orders.map(order => <OrderHistoryCard order={order} key={order.id} />)}
          </Container>
            : <div>Здесь вы будете видеть все заказы, сделанные на сайте</div>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 400px 400px;
    grid-gap: 32px;
    justify-content: center;
`

export default OrdersHistory