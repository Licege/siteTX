import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMyOrdersHistory } from '../../../redux/selectors/profile'
import { requestOrdersHistory } from '../../../redux/thunks/profile.thunks'
import OrderHistoryCard from './Card/index'
import './style.scss'

export const OrdersHistory = () => {
    const orders = useSelector(getMyOrdersHistory)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestOrdersHistory())
    }, [])

    return (
        orders.length
            ? <div className='orders-history__container'>
                {orders.map(order => <OrderHistoryCard order={order} key={order.id} />)}
            </div>
            : <div>Здесь вы будете видеть все заказы, сделанные на сайте</div>
    )
}