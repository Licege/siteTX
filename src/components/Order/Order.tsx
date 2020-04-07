import React from 'react';
import {IOrder} from "../../types/types";
import OrderForm from './FormOrder'


type PropsType = {
    onSubmit: (order: IOrder) => void
}

const Order: React.FC<PropsType> = ( {onSubmit} ) => {
    return (
        <div className='page-container'>
            <h4 className='page-container-title'>~ Бронирование столов ~</h4>
            <p>Описание тут</p>
            <OrderForm onSubmit={onSubmit} />
        </div>
    )
};

export default Order;