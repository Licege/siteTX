import React from 'react';
import {cityType, deliveryGlobalSettingsType, deliverySettingsType, deliveryType, dishType} from "../../types/types";
import altImg from "../../static/img/dish.svg";
import {Button} from "react-bootstrap";
import FormOrder from "./FormOrder";
import {DeliverySubmitType} from "../../containers/Bucket/Bucket";
import {getDishesKey} from "../../plugins/helpers";

type PropsType = {
    dishes: Array<dishType>
    delivery: deliveryType
    settings: Array<deliverySettingsType>
    global_settings: deliveryGlobalSettingsType
    cities: Array<cityType>
    paymentMethod: string
    deliveryMethod: string

    increaseDishCount: (dish: dishType) => void
    reduceDishCount: (dish: dishType) => void
    removeDish: (id: number) => void
    clearBucket: () => void
    priceForDelivery: (city: number | undefined, price: number) => number
    choiceDate: (date: Date | null) => void
    onSubmit: (data: DeliverySubmitType) => void
    onChange: (dish: dishType) => ((event: {target: HTMLInputElement; }) => void)
}

const Bucket: React.FC<PropsType> = ( props ) => {
    const {dishes, delivery, settings, global_settings, cities, paymentMethod, deliveryMethod,
        increaseDishCount, reduceDishCount, removeDish, clearBucket, priceForDelivery, choiceDate, onSubmit, onChange} = props;

    return (
        <div className='card'>
            <div className='card-body'>
                {!!delivery.order.length ?
                <>
                <div className='bucket-header'>
                    <div className='bucket-header-title'>Название:</div>
                    <div className='bucket-header-item'>Количество:</div>
                    <div className='bucket-header-item'>Стоимость:</div>
                </div>
                <div className='bucket-table'>
                    {dishes.map(dish => (
                        <div className='bucket-table-row' key={dish.id}>
                            <img className='bucket-table-row-img' src={dish.url ? dish.url : altImg} alt=''/>
                            <div className='bucket-table-row-info'>
                                <div className='bucket-table-row-info-title'>{dish.title}</div>
                                <div className='bucket-table-row-info-count'>
                                    <span className='custom_subtract' onClick={() => reduceDishCount(dish)}/>
                                    <input className='bucket-table-row-info-count-input' onChange={onChange(dish)} inputMode='numeric' value={getDishesKey(delivery.order, dish.id, 'count')}/>
                                    <span className='custom_add' onClick={() => increaseDishCount(dish)}/>
                                </div>
                                <div
                                    className='bucket-table-row-info-ceil'>{getDishesKey(delivery.order, dish.id, 'price') + ' ₽'}</div>
                            </div>
                            <div><span className='bucket-table-row-remove custom_close'
                                       onClick={() => removeDish(dish.id)}/></div>
                        </div>
                    ))}
                    {!!dishes.length && <div>
                        <Button variant='secondary' onClick={() => clearBucket()}>Очистить корзину</Button>
                    </div>}
                    {!!delivery.order.length && <div>
                        <div>Сумма заказа: {delivery.totalPrice} ₽</div>
                        <div>Стоимость доставки: {priceForDelivery(undefined, delivery.totalPrice)} ₽</div>
                        <div>Итого: {priceForDelivery(undefined, delivery.totalPrice) + delivery.totalPrice} ₽</div>
                    </div>}
                </div>

                <div className='bucket-order'>
                    <h3 className='bucket-order-title'>Оформление заказа</h3>
                    <FormOrder settings={settings}
                               global_settings={global_settings}
                               cities={cities}
                               payment_method={paymentMethod}
                               delivery_method={deliveryMethod}
                               choiceDate={choiceDate}
                               onSubmit={onSubmit} />
                </div>
                </> : <div>Корзина пуста</div>}
            </div>
        </div>
    )
};

export default Bucket;