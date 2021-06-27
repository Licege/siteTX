import React from 'react'
import styled from 'styled-components'
import LinkButton from '../../../components/common/elements/buttons/LinkButton'
import { useBucketOrderTableActionsLogic } from './logic'
import { Button } from '../../../components/core'

const OrderTableActions = () => {
  const { clearBucket } = useBucketOrderTableActionsLogic()

  return (
    <ActionsBlock>
      <LinkButton to="/menu" label="В меню" variant="contained" color="secondary" />
      <CustomButton variant="contained" color="secondary" onClick={clearBucket}>
        Очистить корзину
      </CustomButton>
    </ActionsBlock>
  )
}

const ActionsBlock = styled.div`
  display: flex;
  justify-content: space-between;
`

const CustomButton = styled(Button)`
  margin-bottom: 8px;
  text-align: center;
`

export default OrderTableActions