import React from 'react'
import {PageHeader} from '../../../styledComponents/components'
import {useNewsHeaderLogic} from '../logic'

const Header = () => {
  const {redirectToCreateNews} = useNewsHeaderLogic()

  return (
    <PageHeader title='Новости'>
      <button onClick={redirectToCreateNews} className='btn btn-primary'>Добавить новость</button>
    </PageHeader>
  )
}

export default Header