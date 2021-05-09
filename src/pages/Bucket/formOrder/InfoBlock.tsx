import React from 'react'
import styled from 'styled-components'
import { useBucketInfoBlockLogic } from './logic'
import { Button } from '../../../components/core'

const InfoBlock = () => {
  const { showInfo, sale, price, saleForPickup, totalPrice, deliveryPrice } = useBucketInfoBlockLogic()

  return (
    <>
      {showInfo &&
        <Total>
          <div>Сумма заказа: {totalPrice} ₽</div>
          <div>
            {
              saleForPickup === 0
                ? `Стоимость доставки: ${deliveryPrice} ₽`
                : `Скидка за самовывоз: ${sale} ₽ (${saleForPickup})%`
            }
          </div>
          <div>Итого: {price} ₽</div>
        </Total>
      }

      <ActionsBlock>
        <Button variant='contained' color='primary' type='submit'>
          Оформить заказ ({price} р.)
        </Button>
      </ActionsBlock>
    </>
  )
}

const Total = styled.div`
  margin-bottom: 8px;
`

const ActionsBlock = styled.div`
  margin-bottom: 32px;
  text-align: center;

  button {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`

export default InfoBlock