import React from 'react'
import { Button } from '@material-ui/core'
import { useBucketOrderTableFooterLogic } from './logic'


interface IProps {
  setStep: (step: 0 | 1 | 2) => void
}

const Footer: React.FC<IProps> = ({ setStep }) => {
  const { totalPrice } = useBucketOrderTableFooterLogic()

  return (
    <div className="bucket-table__arrange">
      <div className="bucket-table__price">Сумма заказа: {totalPrice} р.*</div>
      <Button variant="contained" color="primary" onClick={() => setStep(1)}>Оформить заказ</Button>
      <div className="bucket-table__hint">* - цена представлена без учета доставки</div>
    </div>
  )
}

export default Footer