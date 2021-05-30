import React from 'react'
import { useDishes } from '../../../redux/hooks/menu.hooks'
import { LinkButton } from '../styles'

const ShowAllButton = () => {
  const dishes = useDishes()

  return (
    <LinkButton to='/menu' label={`Смотреть все меню из ${dishes.length} блюд`}/>
  )
}

export default ShowAllButton