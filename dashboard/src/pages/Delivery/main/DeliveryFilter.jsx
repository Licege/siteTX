import React from 'react'
import {useDeliveryFilterLogic} from '../logic'

const DeliveryFilter = () => {
  const { changeFilter, clearFilter } = useDeliveryFilterLogic()

  return (
    <div className='card filter'>
      <div className='card-body filter-container'>
        <span className='filter-header'>Фильтры</span>
        <div className='filter-main'>
          <input id='phone' type='text' placeholder='Телефон'
                 className='filter-main-input -name form-control'/>
          <input id='total_price_start' type='text' placeholder='Цена от'
                 className='filter-main-input -name form-control'/>
          <input id='total_price_end' type='text' placeholder='Цена до'
                 className='filter-main-input -name form-control'/>
          <select id='payment_type' className='filter-main-input -name form-control'>
            <option value=''>По типу оплаты</option>
            <option value='cash'>Наличными</option>
            <option value='cashless_payment'>Безналичный расчет</option>
            <option value='cashless_payment_online'>Безналичный расчет online</option>
          </select>
          <select id='delivery_type' className='filter-main-input -name form-control'>
            <option value=''>По типу доставки</option>
            <option value='home'>Доставка</option>
            <option value='restaurant'>Самовывоз</option>
          </select>
          <select id='status' className='filter-main-input -name form-control'>
            <option value=''>По статусу заказа</option>
            <option value='0'>Необработан</option>
            <option value='1'>Готовится</option>
            <option value='2'>В пути</option>
            <option value='3'>Доставлен</option>
            <option value='4'>Отменен</option>
          </select>
          <select id='payment_status' className='filter-main-input -name form-control'>
            <option value=''>По статусу оплаты</option>
            <option value='0'>Не оплачен</option>
            <option value='1'>Оплачен</option>
            <option value='2'>Возвращен</option>
            <option value='3'>Отменен</option>
          </select>
          {/* <CustomDatePicker id='time_delivery_start' className='filter-main-input -name form-control' />
                                <CustomDatePicker id='time_delivery_end' className='filter-main-input -name form-control' />*/}
        </div>
        <div className='filter-actions'>
          <span className='filter-actions-reset' onClick={clearFilter}>Сбросить</span>
          <span className='filter-actions-apply' onClick={changeFilter}>Фильтровать</span>
        </div>
      </div>
    </div>
  )
}

export default DeliveryFilter