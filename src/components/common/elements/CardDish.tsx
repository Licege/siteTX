import React from 'react';
import {dishType} from "../../../types/types";
import altImg from "../../../static/img/dish.svg";

type PropsType = {
    dish: dishType
}

const CardDish: React.FC<PropsType> = ( {dish} ) => {
    return (
        <div className='card card_item'>
            <div className='card-body'>
                <img className='card_item-img' src={dish.url ? dish.url : altImg} alt={dish.title} />
                <h3 className='card_item-title'>{dish.title}</h3>
                {dish.description && <p><b>Описание:</b> {dish.description}</p>}
                {dish.weight && <p><b>Вес:</b> {dish.weight} г.</p>}
                {dish.price && <p><b>Цена:</b> {dish.price} ₽</p>}
            </div>
        </div>
    )
};

export default CardDish;