import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {dishType} from "../../types/types";
import {changeDishCountAC, increaseDishCountAC, reduceDishCountAC, removeDishAC} from "../../redux/bucket-reducer";
import {getDishesKey} from "../../plugins/helpers";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {getMenu} from "../../redux/menu-reducer";

interface IProps {
    isOpen: boolean
    toggle: () => void
}

const BucketInfo: React.FC<IProps> = ( {isOpen, toggle} ) => {
    const dispatch = useDispatch()

    const reduceDishCount = useCallback((dish: dishType) => {
        dispatch(reduceDishCountAC(dish))
    }, [])
    const changeDishCount = useCallback((dish: dishType, count: number) => {
        dispatch(changeDishCountAC(dish, count))
    }, [])
    const increaseDishCount = useCallback((dish: dishType) => {
        dispatch(increaseDishCountAC(dish))
    }, [])
    const removeDish = useCallback((id: number) => {
        dispatch(removeDishAC(id))
    }, [])
    const getDishes = useCallback(() => {
        dispatch(getMenu())
    }, [])

    useEffect(() => {
        getDishes()
    }, [])
    const orders = useSelector((state: AppStateType) => state.bucket.delivery.order)
    const dishes = useSelector((state: AppStateType) => (state.menuPage.menu.filter(dish => state.bucket.delivery.order.find(order => order.id === dish.id) )))

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
                    <div className='shopping_cart-info-content-list-item' key={dish.id}>
                        <div className='shopping_cart-info-content-list-item-title'>{dish.title}</div>
                        <div className='shopping_cart-info-content-list-item-count'>
                            <span className='custom_subtract' onClick={e => reduceDishCount(dish)}/>
                            <input className='shopping_cart-info-content-list-item-count-input'
                                   onChange={onChange(dish)}
                                   inputMode='numeric'
                                   value={getDishesKey(orders, dish.id, 'count')}/>
                            <span className='custom_add' onClick={() => increaseDishCount(dish)}/>
                        </div>
                        <div  className='shopping_cart-info-content-list-item-price'>{getDishesKey(orders, dish.id, 'price') + ' ₽'}</div>
                        <div  className='shopping_cart-info-content-list-item-remove'><span className='custom_close'
                                   onClick={() => removeDish(dish.id)}/></div>
                    </div>
                ))}
            </div>
            </div>
            <div className='shopping_cart-info-footer'>
                <div className='shopping_cart-info-footer-price'>
                    Сумма: {orders.reduce((acc, order) => acc + order.price, 0)} ₽
                </div>
                <NavLink className='shopping_cart-info-footer-button' exact to='/bucket'>
                    <Button variant='contained' color='primary' onClick={toggle}>Оформить заказ</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default BucketInfo;