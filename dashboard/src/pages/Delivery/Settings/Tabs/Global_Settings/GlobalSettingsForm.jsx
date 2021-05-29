import React from 'react'
import { Form, Field } from 'react-final-form'
import { Button } from 'react-bootstrap'
import {useGlobalSettingsFormLogic} from './logic'


const RenderForm = ({ handleSubmit, pristine }) => (
  <form onSubmit={handleSubmit}>
      <div className='d_settings-block'>
          <div className='d_settings-block-item'>
              <div className='d_settings-block-item-label'>Доставка</div>
              <Field name='isDeliveryWorking' component='input' type='checkbox'/>
          </div>
      </div>
      <div>
          <label>Телефон для SMS-уведомлений (В разработке)</label>
          <div>
              <Field name='phone' component='input' type='text' className="filter-main-input -name form-control" placeholder='+79999999999' />
          </div>
      </div>
      <div className='d_settings-block'>
          <div>Доступные варианты оплаты</div>
          <div className='d_settings-block-item'>
              <div className='d_settings-block-item-label'>Наличными курьеру</div>
              <Field name='paymentCash' component='input' type='checkbox'/>
          </div>
          <div className='d_settings-block-item'>
              <div className='d_settings-block-item-label'>Безналичный расчет курьеру</div>
              <Field name='paymentCashless' component='input' type='checkbox'/>
          </div>
          <div className='d_settings-block-item'>
              <div className='d_settings-block-item-label'>Безналичный расчет online</div>
              <Field name='paymentOnline' component='input' type='checkbox'/>
          </div>
      </div>
      <div className="d_settings-block">
          <div className='d_settings-block-item'>Скидка за самовывоз (% от заказа)</div>
          <Field name='saleForPickup' component='input'
                 className="filter-main-input -name form-control"/>
      </div>
      <Button type='button' variant='secondary'>Отменить</Button>
      <Button type='submit' variant='primary'>Сохранить</Button>
  </form>
)

const GlobalSettingsForm = () => {
  const { globalSettings, postGlobalSettings } = useGlobalSettingsFormLogic()

    return (
        <div className='card'>
            <div className='card-body'>
                <Form onSubmit={postGlobalSettings}
                      initialValues={globalSettings}
                      render={formProps => <RenderForm {...formProps} />} />
            </div>
        </div>
    )
}

export default GlobalSettingsForm
