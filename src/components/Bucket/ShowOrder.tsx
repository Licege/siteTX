import React from 'react'
import {fullLink, getDishesKey} from "../../plugins/helpers";
import altImg from "../../static/img/dish.svg";
import {Button} from "@material-ui/core";
import LinkButton from "../common/elements/buttons/LinkButton";
import {SaucesBlock} from "./SaucesBlock";
import {
    deliveryType,
    dishType,
} from "../../types/types";

type PropsType = {
    dishes: Array<dishType>
    sauces: Array<dishType>
    delivery: deliveryType
    deliveryPrice: number
    saleForPickup: number
    orderPrice: number
    sale: number
    price: number

    addDishToBucket: (dish: dishType) => void
    increaseDishCount: (dish: dishType) => void
    reduceDishCount: (dish: dishType) => void
    removeDish: (id: string) => void
    clearBucket: () => void
    onChange: (dish: dishType) => ((event: { target: HTMLInputElement; }) => void)
    setStep: (step: 0 | 1 | 2) => void
}

export const ShowOrder: React.FC<PropsType> =
    ({
         dishes,
         setStep,
         reduceDishCount,
         delivery,
         onChange,
         increaseDishCount,
         removeDish,
         clearBucket,
         sauces,
         addDishToBucket,
         orderPrice,
         saleForPickup,
         deliveryPrice,
         sale,
         price,
     }) => (
        <div>
            <div className='bucket-table'>
                {/*<h3 className='mb-3'>Корзина</h3>*/}
                {dishes.map(dish => (
                    <div className='bucket-table-row' key={dish._id}>
                        <img className='bucket-table-row-img'
                             src={dish.imageSrc ? fullLink(dish.imageSrc) : altImg} alt=''/>
                        <div className='bucket-table-row-info'>
                            <div className='bucket-table-row-info-title'>{dish.title}</div>
                            <div className='bucket-table-row-info-count'>
                                <span className='custom_subtract' onClick={() => reduceDishCount(dish)}/>
                                <input className='bucket-table-row-info-count-input' onChange={onChange(dish)}
                                       inputMode='numeric'
                                       value={getDishesKey(delivery.order, dish._id, 'count')}/>
                                <span className='custom_add' onClick={() => increaseDishCount(dish)}/>
                            </div>
                            <div
                                className='bucket-table-row-info-ceil'>{getDishesKey(delivery.order, dish._id, 'cost') * getDishesKey(delivery.order, dish._id, 'count') + ' ₽'}</div>
                        </div>
                        <div><span className='bucket-table-row-remove custom_close'
                                   onClick={() => removeDish(dish._id)}/></div>
                    </div>
                ))}
            </div>
            {!!dishes.length && <div className='bucket-table__action'>
                <LinkButton to='/menu' label='В меню' variant='contained' color='secondary'/>
                <Button variant='contained' color='secondary' onClick={() => clearBucket()}
                        className='mb-2 text-center'>
                    Очистить корзину
                </Button>
            </div>}

            <SaucesBlock sauces={sauces} addDishToBucket={addDishToBucket}/>

            {!!delivery.order.length && <div>
                <div>Сумма заказа: {orderPrice} ₽</div>
                <div>
                    {
                        saleForPickup === 0
                            ? `Стоимость доставки: ${deliveryPrice} ₽`
                            : `Скидка за самовывоз: ${sale} ₽ (${saleForPickup})%`
                    }
                </div>
                <div>Итого: {price} ₽</div>
                <Button variant='contained' color='primary' onClick={() => setStep(1)}>Оформить заказ</Button>
            </div>}
        </div>
    )