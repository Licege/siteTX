import React from 'react';
import {dishType, orderDishType} from "../../types/types";

type PropsType = {
    dishes: Array<dishType>
    order: Array<orderDishType>

    increaseDish: (id: number) => void
    reduceDish: (id: number) => void
    removeDish: (id: number) => void
    clearBucket: () => void
}

const Bucket: React.FC<PropsType> = ( {dishes, order, increaseDish, reduceDish, removeDish, clearBucket} ) => {
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
                        <div key={dish.id}>
                            <div className=''>{dish.title}</div>
                            <div>
                                <button onClick={e => reduceDish(dish.id)}>-</button>
                                { order.find(o => o.id === dish.id)?.count }
                                <button onClick={e => increaseDish(dish.id)}>+</button>
                            </div>
                            <div>тут будет цена</div>
                            <button onClick={e => removeDish(dish.id)}>Удалить</button>
                        </div>
                    ))}
                    {!!dishes.length && <div>
                        <button onClick={e => clearBucket()}>Очистить корзину</button>
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default Bucket;