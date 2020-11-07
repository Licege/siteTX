import React from 'react'
import { vacancyType } from '../../../types/types'
import altImg from '../../../static/img/female_cook.png'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { fullLink } from '../../../plugins/helpers'

type PropsType = {
    vacancy: vacancyType
}

const CardVacancy: React.FC<PropsType> = ( { vacancy } ) => {
    return (
        <div className='card card_item'>
            <img className='card_item-img' src={vacancy.imageSrc ? fullLink(vacancy.imageSrc) : altImg} alt=''/>
            <div className='card-body'>
                <h3 className='card_item-title'>{vacancy.title}</h3>
                {vacancy.requirements && <p><b>Требования:</b> {vacancy.requirements}</p>}
                {vacancy.description && <p><b>Описание:</b> {vacancy.description}</p>}
                {vacancy.salary_from && vacancy.salary_to
                    ? <p>Заработная плата от {vacancy.salary_from} до {vacancy.salary_to} ₽</p>
                    : vacancy.salary_from || vacancy.salary_to
                        ? <p>Заработная плата: {vacancy.salary_from || vacancy.salary_to} ₽</p> : ''}
                <div className='card_item-button -auto-width'>
                    <Link to={'/resume/' + vacancy._id}>
                        <Button variant='contained'
                                color='primary'>
                            Откликнуться
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CardVacancy
