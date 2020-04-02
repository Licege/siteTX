import React from 'react';
import {dishType} from "../../../types/types";
import altImg from "../../../static/img/dish.svg";
import {Button} from "react-bootstrap";

type PropsType = {
    dish: dishType
    addToBucket: (dish: dishType) => void
}

const CardDish: React.FC<PropsType> = ( {dish, addToBucket} ) => {
    return (
        <div className='card_item'>
            <div className='card card_item-wrapper'>
                <div className='card-body'>
                    <img className='card_item-wrapper-img' src={dish.url ? dish.url : altImg} alt={dish.title} />
                    <h3 className='card_item-wrapper-title'>{dish.title}</h3>
                    {dish.description && <p className='card_item-wrapper-describe'><b>Описание:</b> {dish.description}</p>}
                    {dish.weight && <p className='card_item-wrapper-weight'><b>Вес:</b> {dish.weight} г.</p>}
                    {dish.price && <p className='card_item-wrapper-price'><b>Цена:</b> {dish.price} ₽</p>}
                    <Button className='card_item-wrapper-button' variant='primary' onClick={() => addToBucket(dish)}>Добавить в корзину</Button>
                </div>
            </div>
        </div>
    )
};

export default CardDish;