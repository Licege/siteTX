import React from 'react'
import {usePromoHeaderLogic} from '../logic'
import {Button} from 'react-bootstrap'
import {PageHeader} from '../../../styledComponents/components'

const Header = () => {
  const {redirectToCreatePromo} = usePromoHeaderLogic()

  return (
    <PageHeader title='Акции'>
      <Button variant='primary' onClick={redirectToCreatePromo}>Добавить новую акцию</Button>
    </PageHeader>
  )
}

export default Header