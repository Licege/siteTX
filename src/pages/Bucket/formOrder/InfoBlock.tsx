import React from 'react'
import { useBucketInfoBlockLogic } from './logic'
import { Button } from '@material-ui/core'

const InfoBlock = () => {
  const { showInfo, sale, price, saleForPickup, totalPrice, deliveryPrice } = useBucketInfoBlockLogic()

  return (
    <>
      {showInfo && <div className='bucket-order__total'>
        <div>Сумма заказа: {totalPrice} ₽</div>
        <div>
          {
            saleForPickup === 0
              ? `Стоимость доставки: ${deliveryPrice} ₽`
              : `Скидка за самовывоз: ${sale} ₽ (${saleForPickup})%`
          }
        </div>
        <div>Итого: {price} ₽</div>
      </div>}

      <div className='bucket-order__button'>
        <Button variant='contained' color='primary' type='submit'>
          Оформить заказ ({price} р.)
        </Button>
      </div>
    </>
  )
}

export default InfoBlock