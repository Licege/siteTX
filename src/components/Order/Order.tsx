import React from 'react';
import {IOrder} from "../../types/types";
import OrderForm from './FormOrder'
import img from '../../static/img/order_table.png'


type PropsType = {
    onSubmit: (order: IOrder) => void
}

const Order: React.FC<PropsType> = ( {onSubmit} ) => {
    return (
        <div className='page-container'>
            <h4 className='page-container-title'>~ Бронирование столов ~</h4>
            <div className='order'>
                <img src={img} className='order-img' alt='' />
                <div>
                    <p>Описание тут</p>
                    <OrderForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
};

export default Order;