import React from 'react'
import Color from 'color'
import { Card, CardActionArea, CardMedia, makeStyles, Typography } from '@material-ui/core'
import { dishType } from '../../../types/types'
import altImg from '../../../static/img/dish.svg'
import { cropText } from '../../../plugins/helpers'
import { Button } from '../../core'
import useCardDishLogic from './logic'

type PropsType = {
    dish: dishType
    showDescription?: boolean
    shortCard?: boolean
}

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.03)'
    }
  },
  media: ({ image }) => ({
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    minHeight: '200px'
  }),
  card: ({ color, width = 280, height = 480 }: any) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: 'none',
    width: `${width}px`,
    height: `${height}px`,
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`
    }
  }),
  content: ({ color }) => ({
    backgroundColor: color,
    padding: '1rem 1.5rem 1.5rem'
  })
}))

const CardDish: React.FC<PropsType> = ({ dish, showDescription = true, shortCard }) => {
  const styles = useStyles({ color: '#ff9900', image: dish.imageSrc || altImg, width: 280, height: 480 })

  const { orderedDish, isCategoryDelivery, showDishInfoModal, addDishToBucket, increaseCountDish, reduceCountDish } = useCardDishLogic(dish)

  return (
    <CardActionArea className={styles.actionArea}>
      <Card className={styles.card}>
        <CardMedia className={styles.media} image={dish.imageSrc || altImg} onClick={showDishInfoModal}/>
        <Typography className='card_item-title' variant='h4'>{dish.title}</Typography>
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
                                      {shortCard ? `${dish.cost  } р` : 'Заказать'}
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
      </Card>
    </CardActionArea>
  )
}

export default CardDish
