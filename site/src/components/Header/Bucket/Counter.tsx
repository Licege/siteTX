import React from 'react'
import styled from 'styled-components'
import { useButtonBucketCounterLogic } from './logic'

const Counter = (): JSX.Element | null => {
  const { order, count } = useButtonBucketCounterLogic()

  if (!order?.length) return null

  return <CountWrapper>{count}</CountWrapper>
}

const CountWrapper = styled.span`
  position: absolute;
  top: 10%;
  left: 75%;
  width: 20px;
  height: 20px;
  color: white;
  background-color: rgb(0, 128, 0);
  border-radius: 50%;
  text-align: center;
  line-height: 1.3;
  white-space: nowrap;
  z-index: 10;
`

export default Counter