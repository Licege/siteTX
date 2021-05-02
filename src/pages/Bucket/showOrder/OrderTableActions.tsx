import React from 'react'
import LinkButton from '../../../components/common/elements/buttons/LinkButton'
import { Button } from '@material-ui/core'
import { useBucketOrderTableActionsLogic } from './logic'

const OrderTableActions = () => {
  const { clearBucket } = useBucketOrderTableActionsLogic()

  return (
    <div className="bucket-table__action">
      <LinkButton to="/menu" label="В меню" variant="contained" color="secondary" />
      <Button variant="contained" color="secondary" onClick={clearBucket}
              className="mb-2 text-center"
      >
        Очистить корзину
      </Button>
    </div>
  )
}

export default OrderTableActions