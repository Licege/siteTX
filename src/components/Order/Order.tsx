import React, { useLayoutEffect } from 'react'
import { IOrder } from '../../types/types'
import OrderForm from './FormOrder'
import { orderAPI } from '../../api/api'
import img from '../../static/img/order_table.jpg'


const Order: React.FC = () => {
    useLayoutEffect(() => {
        document.title = 'Заказ столов'
        window.scrollTo(0, 0)
    }, [])

    const onSubmit = ( order: IOrder ) => {
        let date = {...order}
        if (typeof date.order_date !== 'string') {
            date.order_date = date.order_date.toISOString()
        }
        orderAPI.postOrder(date)
    }

    return (
        <main className='page-container'>
            <h1 className='page-container-title'>~ Бронирование столов ~</h1>
            <div className='order'>
                <img src={img} className='order__img' alt='' onLoad={() => console.log('1')}/>
                <div className='order__content'>
                    <p>Описание тут</p>
                    <OrderForm onSubmit={onSubmit}/>
                </div>
            </div>
        </main>
    )
}

export default Order
