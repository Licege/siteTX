import React, {useCallback, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import shopping_cart from "../../static/img/shopping-cart.png";
import Button from '@material-ui/core/Button';
import {getDishesKey} from "../../plugins/helpers";
import {changeDishCountAC, increaseDishCountAC, reduceDishCountAC} from "../../redux/bucket-reducer";
import {dishType} from "../../types/types";
import BucketInfo from "./BucketInfo";

const ButtonBucket = () => {
    const orders = useSelector((state: AppStateType) => state.bucket.delivery.order)
    const [moreInfo, setMoreInfo] = useState(false)

    const toggle = () => {
        setMoreInfo(!moreInfo)
    }

    let count;
    let acc = orders.reduce((acc, order) => acc + order.count, 0);
    acc > 100 ? count = "99+" : count = acc

    return (
        <div className='shopping_cart'>
            <div className='shopping_cart-bucket' onClick={toggle}>
                <img src={shopping_cart} alt='Корзина'/>
                {orders.length ? <span
                    className='shopping_cart-bucket-count'>{count}</span> : ''}
            </div>
            <BucketInfo isOpen={moreInfo} toggle={toggle}/>
        </div>
    )
};

export default ButtonBucket;