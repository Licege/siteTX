import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader } from '../../styledComponents/components'

const Header = () => {
  const history = useHistory()
  const redirectToCreateNewEmployee = () => history.push(`employees/new`)

  return (
    <PageHeader title='Сотрудники'>
      <button className='btn btn-primary' onClick={redirectToCreateNewEmployee}>Добавить нового сотрудника</button>
    </PageHeader>
  )
}

export default Header;