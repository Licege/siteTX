import React from 'react'
import { Button } from '@material-ui/core'
import { SaucesBlock } from '../../../components/Sliders/SliderSauces/SaucesBlock'
import { categoryType, deliveryType, dishType } from '../../../types/types'
import OrderTable from './OrderTable'
import OrderTableActions from './OrderTableActions'
import Footer from './Footer'
import { useBucketShowOrderPageLogic } from './logic'

interface IProps {
    setStep: (step: 0 | 1 | 2) => void
}

export const ShowOrder: React.FC<IProps> = ({ setStep }) => {
  const { dishes } = useBucketShowOrderPageLogic()

  if (!dishes.length) return null

      return (
        <div>
          <OrderTable />
          <OrderTableActions />
          <SaucesBlock />
          <Footer setStep={setStep} />
        </div>
      )
    }
