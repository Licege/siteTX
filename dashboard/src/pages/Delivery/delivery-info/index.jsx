import React from 'react'
import {Form} from 'react-final-form'
import {Button} from 'react-bootstrap'
import {PageHeader} from '../../../styledComponents/components'
import {useDeliveryInfoLogic} from '../logic'
import DeliveryCard from './cards/DeliveryCard'
import CustomerCard from './cards/CustomerCard'
import CostCard from './cards/CostCard'
import {CardsBlock} from '../style'
import DetailOfDelivery from './DetailOfDelivery'

const PageContent = ({handleSubmit, order, showMenuModal}) => (
  <form onSubmit={handleSubmit} className='page'>
    <PageHeader title={`Редактирование заказа: №${order.id}`}>
      <Button variant='primary' type='submit'>Сохранить изменения</Button>
    </PageHeader>
    <div className='delivery_info'>
      <CardsBlock>
        <DeliveryCard />
        <CustomerCard order={order} />
        <CostCard order={order} />
      </CardsBlock>
      <DetailOfDelivery order={order} showMenuModal={showMenuModal} />
    </div>
  </form>
)

const DeliveryInfo = () => {
  const {order, updateOrder, showMenuModal} = useDeliveryInfoLogic()

  if (!order) return <div/>

  return (
    <Form onSubmit={updateOrder}
          initialValues={order}
          render={({...formProps}) => <PageContent {...formProps} order={order} showMenuModal={showMenuModal} />}/>
  )
}

export default DeliveryInfo;
