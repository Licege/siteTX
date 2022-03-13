import React from 'react'
import {Button} from 'react-bootstrap'
import {useCategoriesHeaderLogic} from '../logic'
import {PageHeader} from '../../../styledComponents/components'

const Header = () => {
  const {redirectToCreateCategory} = useCategoriesHeaderLogic()

  return (
    <PageHeader title='Категории'>
      <Button variant="primary" onClick={redirectToCreateCategory}>
        Добавить категорию
      </Button>
    </PageHeader>
  )
}

export default Header