import React from 'react'
import { dishType } from '../../../types/types'
import altImg from '../../../static/img/dish.svg'
import { cropText } from '../../../plugins/helpers'
import { Button, Card, CardBody, CardFooter, CardMedia, CardText, CardTitle, CardWrapper } from '../../core'
import useCardDishLogic from './logic'

type PropsType = {
    dish: dishType
    showDescription?: boolean
    shortCard?: boolean
}

const CardDish: React.FC<PropsType> = ({ dish, showDescription = true, shortCard}) => {
  const { orderedDish, isCategoryDelivery, showDishInfoModal, addDishToBucket, increaseCountDish, reduceCountDish } = useCardDishLogic(dish)

    return (
            <CardWrapper>
                <Card>
                  <CardBody>
                    <CardMedia image={dish.imageSrc || altImg} onClick={showDishInfoModal} />
                    <CardTitle>{dish.title}</CardTitle>
                    {showDescription && dish.description &&
                    <CardText><b>Описание:</b> {cropText(dish.description, 70)}</CardText>}
                  </CardBody>
                  <CardFooter>
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
                  </CardFooter>
                </Card>
            </CardWrapper>
    )
}

export default CardDish
