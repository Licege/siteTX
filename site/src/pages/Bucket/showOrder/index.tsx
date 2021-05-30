import React from 'react'
import { SaucesBlock } from '../../../components/Sliders/SliderSauces/SaucesBlock'
import OrderTable from './OrderTable'
import OrderTableActions from './OrderTableActions'
import Footer from './Footer'
import { useBucketShowOrderPageLogic } from './logic'

interface IProps {
    setStep: (step: 0 | 1 | 2) => void
}

const ShowOrder: React.FC<IProps> = ({ setStep }) => {
  const { dishes } = useBucketShowOrderPageLogic()

  if (!dishes.length) return null

  return (
    <main>
      <OrderTable />
      <OrderTableActions />
      <SaucesBlock />
      <Footer setStep={setStep} />
    </main>
  )
}

export default ShowOrder