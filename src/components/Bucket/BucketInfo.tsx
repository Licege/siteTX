import React, {useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {dishType} from "../../types/types";
import {changeDishCountAC, increaseDishCountAC, reduceDishCountAC, removeDishAC} from "../../redux/bucket-reducer";
import {getDishesKey} from "../../plugins/helpers";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

interface IProps {
    isOpen: boolean
    toggle: () => void
}

const BucketInfo: React.FC<IProps> = ( {isOpen, toggle} ) => {
    const orders = useSelector((state: AppStateType) => state.bucket.delivery.order)
    const dishes = useSelector((state: AppStateType) => state.bucket.orderedDishes)
    const dispatch = useDispatch()

    const reduceDishCount = useCallback((dish: dishType) => {
        dispatch(reduceDishCountAC(dish))
    }, [dispatch])
    const changeDishCount = useCallback((dish: dishType, count: number) => {
        dispatch(changeDishCountAC(dish, count))
    }, [dispatch])
    const increaseDishCount = useCallback((dish: dishType) => {
        dispatch(increaseDishCountAC(dish))
    }, [dispatch])
    const removeDish = useCallback((id: string) => {
        dispatch(removeDishAC(id))
    }, [dispatch])

    const onChange = (dish: dishType) => {
        return (event: {target: HTMLInputElement; }) => {
            let value = event.target.value
            if (value === '') value = '1'
            changeDishCount(dish, parseInt(value, 10))
        }
    }

    return (
        <div className={isOpen ? 'shopping_cart-info -active' : 'shopping_cart-info'}>
            <div className='shopping_cart-info-content'>
            <div className='shopping_cart-info-content-list'>
                {dishes.map(dish => (
                    <div className='shopping_cart-info-content-list-item' key={dish._id}>
                        <div className='shopping_cart-info-content-list-item-title'>{dish.title}</div>
                        <div className='shopping_cart-info-content-list-item-count'>
                            <span className='custom_subtract' onClick={e => reduceDishCount(dish)}/>
                            <input className='shopping_cart-info-content-list-item-count-input'
                                   onChange={onChange(dish)}
                                   inputMode='numeric'
                                   value={getDishesKey(orders, dish._id, 'count')}/>
                            <span className='custom_add' onClick={() => increaseDishCount(dish)}/>
                        </div>
                        <div  className='shopping_cart-info-content-list-item-price'>{getDishesKey(orders, dish._id, 'price') * getDishesKey(orders, dish._id, 'count') + ' ₽'}</div>
                        <div  className='shopping_cart-info-content-list-item-remove'><span className='custom_close'
                                   onClick={() => removeDish(dish._id)}/></div>
                    </div>
                ))}
            </div>
            </div>
            <div className='shopping_cart-info-footer'>
                <div className='shopping_cart-info-footer-price'>
                    Сумма: {orders.reduce((acc, order) => acc + order.price * order.count, 0)} ₽
                </div>
                <NavLink className='shopping_cart-info-footer-button' exact to='/bucket'>
                    <Button variant='contained' color='primary' onClick={toggle}>Оформить заказ</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default BucketInfo;