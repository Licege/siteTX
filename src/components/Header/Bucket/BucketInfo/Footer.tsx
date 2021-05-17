import React from 'react'
import { useBucketInfoFooterLogic } from '../logic'
import { FooterContainer, SubmitButton, TotalPrice } from './styles'
import { Button } from '../../../core'

interface IProps {
  toggle: () => void
}

const Footer: React.FC<IProps> = ({ toggle }) => {
  const { totalPrice } = useBucketInfoFooterLogic()

  return (
    <FooterContainer>
      <TotalPrice>Сумма: {totalPrice} ₽</TotalPrice>
      <SubmitButton exact to='/bucket'>
        <Button variant='contained' color='primary' onClick={toggle}>Оформить заказ</Button>
      </SubmitButton>
    </FooterContainer>
  )
}

export default Footer