import React from 'react'
import { useButtonBucketCounterLogic } from './logic'

const Counter = (): JSX.Element | null => {
  const { order, count } = useButtonBucketCounterLogic()

  if (!order?.length) return null

  return (
    <span className='shopping_cart-bucket-count'>{count}</span>
  )
}

export default Counter