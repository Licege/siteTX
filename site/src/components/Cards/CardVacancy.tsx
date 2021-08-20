import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { vacancyType } from '../../types/types'
import altImg from '../../static/img/female_cook.png'

type PropsType = {
    vacancy: vacancyType
}

const CardVacancy: React.FC<PropsType> = ( { vacancy } ) => (
  <div className='card card_item'>
    <img className='card_item-img' src={vacancy.imageSrc || altImg} alt=''/>
    <div className='card-body'>
      <h3 className='card_item-title'>{vacancy.title}</h3>
      {vacancy.requirements && <p><b>Требования:</b> {vacancy.requirements}</p>}
      {vacancy.description && <p><b>Описание:</b> {vacancy.description}</p>}
      {/* eslint-disable-next-line no-nested-ternary */}
      {vacancy.salaryFrom && vacancy.salaryTo
                    ? <p>Заработная плата от {vacancy.salaryFrom} до {vacancy.salaryTo} ₽</p>
                    : vacancy.salaryFrom || vacancy.salaryTo
                        ? <p>Заработная плата: {vacancy.salaryFrom || vacancy.salaryTo} ₽</p> : ''}
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
