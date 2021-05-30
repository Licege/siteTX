import React from 'react'
import {usePaginatorLogic} from '../../logic'
import CommonPaginator from '../../../../components/common/Paginator'

const Paginator = () => {
  const props = usePaginatorLogic()

  return <CommonPaginator {...props} />
}

export default Paginator