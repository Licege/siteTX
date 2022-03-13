import React from 'react'
import altImg from '../../../static/img/vacancy.png'
import {cropText} from '../../../plugins/helpers'

const SalaryBlock = ({salary}) => {
  const {salary_from, salary_to} = salary;

  if (salary_from && salary_to) {
    return <p>Заработная плата от {salary_from} до {salary_to} ₽</p>
  }

  if (salary_from || salary_to) {
    return <p>Заработная плата: {salary_from || salary_to} ₽</p>
  }

  return null
}



const CardVacancy = ({card, change, remove}) => {
  return (
    <div className='card card_vacancy'>
      <img className='card_vacancy-img' src={card.imageSrc || altImg}
           alt={card.title}/>
      <div className='card-body pt-0'>
        <h3 className='card_vacancy-title'>{card.title ? card.title : 'Вакансия'}</h3>
        {card.shortDescription && <p><b>Описание:</b> {cropText(card.shortDescription, 140)}</p>}
        <SalaryBlock salary={card} />
        <div className='card_vacancy-button'>
          <button className='btn btn-primary mr-2' onClick={change(card.id)}>Изменить</button>
          <button className='btn btn-danger' onClick={remove(card.id)}>Удалить</button>
        </div>
      </div>
    </div>
  )
}

export default CardVacancy
