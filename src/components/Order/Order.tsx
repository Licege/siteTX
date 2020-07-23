import React from 'react';
import {IOrder} from "../../types/types";
import OrderForm from './FormOrder'
import img from '../../static/img/order_table.png'


type PropsType = {
    onSubmit: (order: IOrder) => void
}

const Order: React.FC<PropsType> = ( {onSubmit} ) => {
    return (
        <main className='page-container'>
            <h4 className='page-container-title'>~ Бронирование столов ~</h4>
            <div className='order'>
                <img src={img} className='order__img' alt='' />
                <div className='order__content'>
                    <p>Описание тут</p>
                    <OrderForm onSubmit={onSubmit} />
                </div>
            </div>
        </main>
    )
};

export default Order;
