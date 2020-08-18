import React from 'react'

interface IProps {
    orderStatus: string
}

export const FinishOrder: React.FC<IProps> = ({ orderStatus }) => (
    <div>
        <div>Заказ успешно создан!</div>
        <div>В ближайшее время с Вами свяжется менеджер для уточнения деталей заказа.</div>
    </div>
)
