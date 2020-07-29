import React from 'react'
import {fullLink, getDishesKey} from '../../plugins/helpers'
import altImg from '../../static/img/dish.svg'
import {Button} from '@material-ui/core'
import LinkButton from '../common/elements/buttons/LinkButton'
import {SaucesBlock} from './SaucesBlock'
import {
    deliveryType,
    dishType,
} from '../../types/types'

type PropsType = {
    dishes: Array<dishType>
    sauces: Array<dishType>
    delivery: deliveryType
    deliveryPrice: number
    saleForPickup: number
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
         saleForPickup,
         deliveryPrice,
         sale,
         price,
         addDishToBucket,
     }) => (
        <div>
            <div className='bucket-table'>
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

            <div className='bucket-table__arrange'>
                <div className='bucket-table__price'>Сумма заказа: {delivery.total_price} р.*</div>
                <Button variant='contained' color='primary' onClick={() => setStep(1)}>Оформить заказ</Button>
            </div>
            <div className='bucket-table__hint'>* - цена представлена без учета доставки</div>
        </div>
    )
