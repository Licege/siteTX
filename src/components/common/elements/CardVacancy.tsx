import React from 'react';
import {vacancyType} from "../../../types/types";
import altImg from "../../../static/img/female_cook.png";

type PropsType = {
    vacancy: vacancyType
}

const CardVacancy: React.FC<PropsType> = ( {vacancy} ) => {
    return (
        <div className='card card_item'>
            <div className='card-body'>
                <img className='card_item-img' src={vacancy.url ? vacancy.url : altImg} alt='' />
                <h3 className='card_item-title'>{vacancy.title}</h3>
                {vacancy.requirements && <p><b>Требования:</b> {vacancy.requirements}</p> }
                {vacancy.description && <p><b>Описание:</b> {vacancy.description}</p> }
                {vacancy.salary_from && vacancy.salary_to
                    ? <p>Заработная плата от {vacancy.salary_from} до {vacancy.salary_to} ₽</p>
                    : vacancy.salary_from || vacancy.salary_to
                        ? <p>Заработная плата: {vacancy.salary_from || vacancy.salary_to} ₽</p> : ''}
            </div>
        </div>
    )
};

export default CardVacancy;