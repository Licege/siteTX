import React from 'react'
import CreateCategoryForm from './CreateCategoryForm'
import {PageHeader} from '../../../styledComponents/components'

const CreateCategory = () => (
    <div className="page">
      <PageHeader title='Создание новой категории' />
      <CreateCategoryForm />
    </div>
  )

export default CreateCategory