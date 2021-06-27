import React from 'react'
import styled from 'styled-components'
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

const CardDish: React.FC<PropsType> = ({ dish, showDescription = true, shortCard = false }) => {
  const {
    orderedDish,
    isCategoryDelivery,
    showDishInfoModal,
    addDishToBucket,
    increaseCountDish,
    reduceCountDish
  } = useCardDishLogic(dish)

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
          {!shortCard && (
            <ItemInfo>
              {dish.cost ? <Price>{dish.cost} руб.</Price> : null}
              {dish.weight ? <Weight>{dish.weight} г.</Weight> : null}
            </ItemInfo>
          )}

          {dish.isDelivery && isCategoryDelivery
            ? <ActionsBlock>
              {!orderedDish || shortCard
                ? <Button variant="contained" color="primary" onClick={() => addDishToBucket(dish)}>
                  {shortCard ? `${dish.cost  } р` : 'Заказать'}
                </Button>
                : <OrderedActionsBlock>
                  <Button variant="contained" color="primary"
                          onClick={() => reduceCountDish(dish)}>
                    -
                  </Button>
                  <Count>{orderedDish?.count}</Count>
                  <Button variant="contained" color="primary"
                          onClick={() => increaseCountDish(dish)}>
                    +
                  </Button>
                </OrderedActionsBlock>}
            </ActionsBlock>
            : <NoDelivery>
              Доступно только в ресторане
            </NoDelivery>
          }
        </CardFooter>
      </Card>
    </CardWrapper>
  )
}

export default CardDish

const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
`

const Price = styled.p`
  margin-right: 8px;
  margin-bottom: 0.5rem;
  font-weight: 600;
`

const Weight = styled.p`
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.5rem;
  font-size: .75rem;
`

const ActionsBlock = styled.div`
  display: block;
  text-align: center;

  button {
    height: 35px;
    width: 120px;
  }
`

const OrderedActionsBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  .MuiButton-root {
    padding: 6px;
    min-width: auto;
  }

  button {
    width: 36px;
  }
`

const Count = styled.span`
  display: block;
  width: 36px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
`

const NoDelivery = styled.div`
  text-align: center;
  line-height: 18px;
  user-select: none;
`
