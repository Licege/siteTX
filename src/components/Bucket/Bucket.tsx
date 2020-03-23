import React from 'react';
import {deliveryType, dishType, orderDishType} from "../../types/types";
import altImg from "../../static/img/dish.svg";

type PropsType = {
    dishes: Array<dishType>
    delivery: deliveryType

    increaseDish: (dish: dishType) => void
    reduceDish: (dish: dishType) => void
    removeDish: (id: number) => void
    clearBucket: () => void
}

const Bucket: React.FC<PropsType> = ( {dishes, delivery, increaseDish, reduceDish, removeDish, clearBucket} ) => {
    console.log(delivery.totalPrice)
    console.log(delivery)
    return (
        <div className='card'>
            <div className='card-body'>
                <div className='bucket-header'>
                    <div className='bucket-header-item'>Название:</div>
                    <div className='bucket-header-item'>Количество:</div>
                    <div className='bucket-header-item'>Стоимость:</div>
                </div>
                <div className='bucket-table'>
                    {dishes.map(dish => (
                        <div className='bucket-table-row' key={dish.id}>
                            <img className='bucket-table-row-img' src={dish.url ? dish.url : altImg} alt='' />
                            <div className='bucket-table-row-info'>
                                <div className=''>{dish.title}</div>
                                <div>
                                    <button onClick={e => reduceDish(dish)}>-</button>
                                    { delivery.order.find(o => o.id === dish.id)?.count }
                                    <button onClick={e => increaseDish(dish)}>+</button>
                                </div>
                                <div>{ delivery.order.find(o => o.id === dish.id)?.price}</div>
                                <button onClick={e => removeDish(dish.id)}>Удалить</button>
                            </div>
                        </div>
                    ))}
                    {!!dishes.length && <div>
                        <button onClick={e => clearBucket()}>Очистить корзину</button>
                    </div>}
                    {!!delivery.order.length && <div>
                        <span>{delivery.totalPrice}</span>
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default Bucket;