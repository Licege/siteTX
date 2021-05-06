import React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ordersHistoryType } from '../../../../types/types'
import './style.scss'
import { parseAddress } from '../../../../plugins/helpers';
import { Button } from 'react-bootstrap';
import { DeliveryTypeEnum, PaymentTypeEnum } from '../../../../dictionaries/delivery';

interface IProps {
    order: ordersHistoryType
}

const getDate = (date: Date) => {
    return format(date, 'd MMMM yyyy г. в HH:mm', { locale: ru })
}

const getTotalPrice = (price: number, deliveryCost: number) => {
    const totalPrice = price + deliveryCost
    return `Сумма ${totalPrice | 0} ₽`
}

const OrderHistoryCard = ({ order }: IProps) => {
    const { price, deliveryType, deliveryCost, address, createdAt, id, status, paymentType } = order

    return (
        <div className='card-history-orders'>
            <div className='card-history-orders__info'>
                <div className='card-history-orders__date'>{getDate(new Date(createdAt))}</div>
                <div className='card-history-orders__block-address'>
                    <div>{DeliveryTypeEnum[deliveryType]}</div>
                    <div className='card-history-orders__address'>{parseAddress(address)}</div>
                </div>
                <div className='card-history-orders__block-price'>
                    <div>{PaymentTypeEnum[paymentType]}</div>
                    <div className='card-history-orders__price'>{getTotalPrice(price, deliveryCost)}</div>
                </div>
            </div>
            <div className='card-history-orders__button-repeat'>
                <Button variant='primary' onClick={() => {}}>Повторить заказ</Button>
            </div>
        </div>
    )
}

export default OrderHistoryCard