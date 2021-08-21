import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { vacancyType } from '../../types/types'
import altImg from '../../static/img/female_cook.png'

type PropsType = {
    vacancy: vacancyType
}

const SalaryBlock: React.FC<PropsType> = ({ vacancy }) => {
  if (vacancy.salaryFrom && vacancy.salaryTo) {
    return <p>Заработная плата от <b>{vacancy.salaryFrom}</b> до <b>{vacancy.salaryTo}</b> ₽</p>
  }

  if (vacancy.salaryFrom || vacancy.salaryTo) {
    return <p>Заработная плата: <b>{vacancy.salaryFrom || vacancy.salaryTo}</b> ₽</p>
  }

  return null;
}

const CardVacancy: React.FC<PropsType> = ({ vacancy }) => (
  <div className='card card_item'>
    <Link to={`/vacancies/${vacancy.id}`}>
      <img className='card_item-img' src={vacancy.imageSrc || altImg} alt=''/>
    </Link>
    <div className='card-body'>
      <h3 className='card_item-title'>{vacancy.title}</h3>
      {vacancy.shortDescription && <p><b>Описание:</b> {vacancy.shortDescription}</p>}
      <SalaryBlock vacancy={vacancy} />
      <div className='card_item-button -auto-width'>
        <Link to={`/resume/${  vacancy.id}`}>
          <Button variant='contained'
                  color='primary'>
            Откликнуться
          </Button>
        </Link>
      </div>
    </div>
  </div>
)

export default CardVacancy
