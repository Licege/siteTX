import React from 'react'
import { Table } from 'react-bootstrap'
import Paginator from './Paginator'
import TableContent from './TableContent'

const DeliveryTable = () => (
        <div>
            <Table responsive>
                <thead className='table-thread'>
                <tr>
                    <th>Телефон</th>
                    <th>Заказ</th>
                    <th>Сумма</th>
                    <th>Создан</th>
                    <th>Тип доставки</th>
                    <th>Дата и время доставки</th>
                    <th>Тип оплаты</th>
                    <th>Статус заказа</th>
                    <th>Статус оплаты</th>
                </tr>
                </thead>
                <TableContent />
            </Table>
            <Paginator />
        </div>
    )


export default DeliveryTable
