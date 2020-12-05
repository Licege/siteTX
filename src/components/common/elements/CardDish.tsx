import React, { CSSProperties, useState } from 'react'
import { categoryType, dishType, orderDishType } from '../../../types/types'
import altImg from '../../../static/img/dish.svg'
import Button from '@material-ui/core/Button'
import { cropText, fullLink } from '../../../plugins/helpers'
import ModalDish from './modals/ModalDish'

type PropsType = {
    dish: dishType
    categories: Array<categoryType>
    order?: Array<orderDishType>
    showDescription?: boolean
    shortCard?: boolean

    addToBucket: (dish: dishType) => void
    increaseCountDish?: (dish: dishType) => void
    reduceCountDish?: (dish: dishType) => void
}

const CardDish: React.FC<PropsType> = ({
                                           dish,
                                           categories,
                                           order,
                                           addToBucket,
                                           showDescription = true,
                                           shortCard,
                                           increaseCountDish = () => {},
                                           reduceCountDish= () => {},
                                       }) => {
    const style = {
        backgroundImage: `url(${dish.imageSrc ? fullLink(dish.imageSrc) : altImg})`,
        backgroundSize: 'cover',
        borderRadius: shortCard ? '4px' : '',
    } as CSSProperties

    const [isOpen, setOpen] = useState(false)

    const orderedDish = order?.find(d => d.dishId === dish.id)
    const category = categories.find(category => category.id === dish.categoryId)
    const isCategoryDelivery = category?.isDelivery

    return (
        <>
            <div className={'card card_item' + (shortCard ? ' -short' : '')}>
                <div className='card_item-img' style={style} onClick={() => setOpen(true)}/>
                <div className='card_item__wrapper'>
                    <h3 className='card_item-title'>{dish.title}</h3>
                    {showDescription && dish.description &&
                    <p className='card_item-describe'><b>Описание:</b> {cropText(dish.description, 70)}</p>}
                    <div className='card_item-action'>
                        <div className='card_item-info'>
                            {dish.cost ? <p className='card_item-info-price'>{dish.cost} руб.</p>: null}
                            {dish.weight ? <p className='card_item-info-weight'>{dish.weight} г.</p> : null}
                        </div>

                        {dish.isDelivery && isCategoryDelivery
                            ? <div className='card_item-button'>
                                {!orderedDish || shortCard
                                    ? <Button variant='contained' color='primary' onClick={() => addToBucket(dish)}>
                                        {shortCard ? dish.cost + ' р' : 'Заказать'}
                                    </Button>
                                    : <div className='card_item-button__ordered'>
                                        <Button variant='contained' color='primary'
                                                onClick={() => reduceCountDish(dish)}>
                                            -
                                        </Button>
                                        <span className='value'>{orderedDish?.count}</span>
                                        <Button variant='contained' color='primary'
                                                onClick={() => increaseCountDish(dish)}>
                                            +
                                        </Button>
                                    </div>}
                            </div>
                            : <div className='card_item-no_delivery'>
                                Доступно только в ресторане
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ModalDish dish={dish} open={isOpen} addToBucket={() => addToBucket(dish)} onClose={() => setOpen(false)}/>
        </>
    )
}

export default CardDish
