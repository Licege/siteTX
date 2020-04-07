import React, {CSSProperties} from 'react';
import {dishType} from "../../../types/types";
import altImg from "../../../static/img/dish.svg";
import Button from '@material-ui/core/Button';
import {cropText} from "../../../plugins/helpers";

type PropsType = {
    dish: dishType
    addToBucket: (dish: dishType) => void
}

const CardDish: React.FC<PropsType> = ( {dish, addToBucket} ) => {
    const style = {
        backgroundImage: `url(${dish.file.id !== 0 ? dish.file.url : altImg})`,
        backgroundSize: "cover"
    } as CSSProperties

    return (
        <div className='card_item'>
            <div className='card card_item-wrapper'>
                <div className='card_item-wrapper-img' style={style} />
                <div className='card-body pt-0'>
                    <h3 className='card_item-wrapper-title'>{dish.title}</h3>
                    {dish.description && <p className='card_item-wrapper-describe'><b>Описание:</b> {cropText(dish.description, 70)}</p>}
                    <div className='card_item-wrapper-info'>
                        {dish.weight && <p className='card_item-wrapper-info-weight'><b>Вес:</b> {dish.weight} г.</p>}
                        {dish.price && <p className='card_item-wrapper-info-price'><b>Цена:</b> {dish.price} ₽</p>}
                    </div>

                    <div className='card_item-wrapper-button'>
                        <Button variant='contained' color='primary' onClick={() => addToBucket(dish)}>Добавить в корзину</Button>
                    </div>

                </div>
            </div>
        </div>
    )
};

export default CardDish;