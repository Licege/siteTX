import React from 'react'
import altImg from '../../../static/img/dish.svg'
import { cropText, getTitleById } from '../../../plugins/helpers'

let CardDish = ({ dish, categories, remove, detail }) => {
    const style = {
        backgroundImage: `url(${dish.imageSrc || altImg})`,
        backgroundSize: 'cover',
    }

    return (
        <div className='card card_vacancy'>
            <div className='card_vacancy-img' style={style}/>
            <div className='card-body'>
                <h3 className='card_vacancy-title'>{dish.title}</h3>
                {dish.description && <p><b>Описание:</b> {cropText(dish.description, 70)} </p>}
                {dish.weight && <p><b>Вес:</b> {dish.weight + ' г.'} </p>}
                {dish.cost && <p><b>Цена:</b> {dish.cost + ' ₽'} </p>}
                {dish.categoryId && categories.length &&
                <p>Категория: {getTitleById(categories, dish.categoryId)}</p>}
                <div className='card_vacancy-button'>
                    <button className='btn btn-primary mr-2' onClick={detail(dish.id)}>Изменить</button>
                    <button className='btn btn-danger' onClick={remove}>Удалить</button>
                </div>
            </div>
        </div>
    )
}

export default CardDish
