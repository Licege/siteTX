import React from 'react';
import {orderType} from "../../types/types";

type PropsType = {
    postOrder: (order: orderType) => void
}

const Order: React.FC<PropsType> = ( {postOrder} ) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='page-title'>~ Бронирование столов ~</h4>
                <p>Описание тут</p>
                <div>
                    123
                </div>
            </div>
        </div>
    )
};

export default Order;