import React from 'react'
import DeliveryTable from './table/DeliveryTable'
import {PageHeader} from '../../../styledComponents/components'
import DeliveryFilter from './DeliveryFilter'

const Delivery = () => (
  <div>
    <PageHeader title='Заказы' />
    <div className='page-container'>
      <DeliveryFilter />
      <DeliveryTable />
    </div>
  </div>
)

export default Delivery
