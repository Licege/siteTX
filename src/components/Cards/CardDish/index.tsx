import React, { CSSProperties } from 'react'
import { dishType } from '../../../types/types'
import altImg from '../../../static/img/dish.svg'
import { cropText } from '../../../plugins/helpers'
import { Button } from '../../core'
import useCardDishLogic from './logic'
import { Card } from '@material-ui/core'

type PropsType = {
    dish: dishType
    showDescription?: boolean
    shortCard?: boolean
}

const CardDish: React.FC<PropsType> = ({ dish, showDescription = true, shortCard}) => {
    const style = {
        backgroundImage: `url(${dish.imageSrc || altImg})`,
        backgroundSize: 'cover',
        borderRadius: shortCard ? '4px' : '',
    } as CSSProperties

  const { orderedDish, isCategoryDelivery, showDishInfoModal, addDishToBucket, increaseCountDish, reduceCountDish } = useCardDishLogic(dish)

    return (
            <div className={'card card_item' + (shortCard ? ' -short' : '')}>
                <div className='card_item-img' style={style} onClick={showDishInfoModal}/>
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
                                    ? <Button variant='contained' color='primary' onClick={() => addDishToBucket(dish)}>
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
    )
}

export default CardDish
