import React from 'react'
import { IOrder } from '../../types/types'
import OrderForm from './FormOrder'
import img from '../../static/img/order_table.png'
import { CSSTransition } from 'react-transition-group'
import { useHistory } from 'react-router'


type PropsType = {
    onSubmit: ( order: IOrder ) => void
}

const Order: React.FC<PropsType> = ( {onSubmit} ) => {
    let history = useHistory()

    return (
        <CSSTransition
            timeout={2000}
            in={history.location.pathname === '/order'}
            classNames='anim'
            mountOnEnter
            unmountOnExit
        >
            <main className='page-container'>
                <h4 className='page-container-title'>~ Бронирование столов ~</h4>
                <div className='order'>
                    <img src={img} className='order__img' alt='' onLoad={() => console.log('1')}/>
                    <div className='order__content'>
                        <p>Описание тут</p>
                        <OrderForm onSubmit={onSubmit}/>
                    </div>
                </div>
            </main>
        </CSSTransition>
    )
}

export default Order
