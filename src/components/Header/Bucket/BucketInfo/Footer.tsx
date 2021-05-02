import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useBucketInfoFooterLogic } from '../logic'

interface IProps {
  toggle: () => void
}

const Footer: React.FC<IProps> = ({ toggle }) => {
  const { totalPrice } = useBucketInfoFooterLogic()

  return (
    <div className='shopping_cart-info-footer'>
      <div className='shopping_cart-info-footer-price'>
        Сумма: {totalPrice} ₽
      </div>
      <NavLink className='shopping_cart-info-footer-button' exact to='/bucket'>
        <Button variant='contained' color='primary' onClick={toggle}>Оформить заказ</Button>
      </NavLink>
    </div>
  )
}

export default Footer