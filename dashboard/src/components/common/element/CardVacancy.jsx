import React from 'react'
import altImg from '../../../static/img/vacancy.png'
import { cropText } from '../../../plugins/helpers'

let CardVacancy = ({ card, change, remove }) => {
    return (
        <div className='card card_vacancy'>
            <img className='card_vacancy-img' src={card.imageSrc || altImg}
                 alt={card.title}/>
            <div className='card-body pt-0'>
                <h3 className='card_vacancy-title'>{card.title ? card.title : 'Вакансия'}</h3>
                {card.requirements && <p><b>Требования:</b> {cropText(card.requirements, 70)}</p>}
                {card.description && <p><b>Описание:</b> {cropText(card.description, 70)}</p>}
                {card.salary_from && card.salary_to
                    ? <p>Заработная плата от {card.salary_from} до {card.salary_to} ₽</p>
                    : card.salary_from || card.salary_to
                        ? <p>Заработная плата: {card.salary_from || card.salary_to} ₽</p> : ''}
                <div className='card_vacancy-button'>
                    <button className='btn btn-primary mr-2' onClick={change(card.id)}>Изменить</button>
                    <button className='btn btn-danger' onClick={remove(card.id)}>Удалить</button>
                </div>
            </div>
        </div>
    )
}

export default CardVacancy
