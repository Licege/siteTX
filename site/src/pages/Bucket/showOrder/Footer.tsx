import React from 'react'
import styled from 'styled-components'
import { Button } from '@ui-kit'
import { useBucketOrderTableFooterLogic } from './logic'


interface IProps {
  setStep: (step: 0 | 1 | 2) => void
}

const Footer: React.FC<IProps> = ({ setStep }) => {
  const { totalPrice } = useBucketOrderTableFooterLogic()

  return (
    <ArrangeBlock>
      <div>Сумма заказа: {totalPrice} р.*</div>
      <Button variant="contained" color="primary" onClick={() => setStep(1)}>Оформить заказ</Button>
      <Hint>* - цена представлена без учета доставки</Hint>
    </ArrangeBlock>
  )
}

const ArrangeBlock = styled.footer`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;

  button {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
`

const Hint = styled.div`
  position: absolute;
  right: 0;
  bottom: -22px;
  font-size: 10px;
  line-height: 14px;
  text-align: end;
`

export default Footer