import React, {CSSProperties} from 'react';
import {dishType} from "../../../types/types";
import altImg from "../../../static/img/dish.svg";
import Button from '@material-ui/core/Button';
import {cropText, fullLink} from "../../../plugins/helpers";

type PropsType = {
    dish: dishType
    addToBucket: (dish: dishType) => void
}

const CardDish: React.FC<PropsType> = ( {dish, addToBucket} ) => {
    const style = {
        backgroundImage: `url(${dish.imageSrc ? fullLink(dish.imageSrc) : altImg})`,
        backgroundSize: "cover"
    } as CSSProperties

    return (
        <div className='card card_item'>
            <div className='card_item-img' style={style}/>
            <div className='card-body pt-0'>
                <h3 className='card_item-title'>{dish.title}</h3>
                {dish.description &&
                <p className='card_item-describe'><b>Описание:</b> {cropText(dish.description, 70)}</p>}
                <div className='card_item-info'>
                    {dish.weight && <p className='card_item-info-weight'><b>Вес:</b> {dish.weight} г.</p>}
                    {dish.cost && <p className='card_item-info-price'><b>Цена:</b> {dish.cost} ₽</p>}
                </div>

                <div className='card_item-button'>
                    <Button variant='contained' color='primary' onClick={() => addToBucket(dish)}>Добавить в
                        корзину</Button>
                </div>
            </div>
        </div>
    )
};

export default CardDish;