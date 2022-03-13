import React from 'react'
import {useCurrentCategory} from '../../../redux/hooks/menu.hooks'
import {PageHeader} from '../../../styledComponents/components'

const Header = () => {
  const category = useCurrentCategory()
  const title = `Редактирование категории: ${category?.title || ''}`

  return (
    <PageHeader title={title} />
  )
}

export default Header