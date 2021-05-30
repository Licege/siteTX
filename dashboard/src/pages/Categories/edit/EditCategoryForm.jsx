import React from 'react'
import {Form} from 'react-final-form'
import {useEditCategoryLogic} from '../logic'
import CategoryForm from '../CategoryForm'

const EditCategoryForm = () => {
  const { category, validate, editCategory, cancel } = useEditCategoryLogic()

  return (
    <Form onSubmit={editCategory} initialValues={category} validate={validate} render={formProps => <CategoryForm {...formProps} cancel={cancel} />} />
  )
}

export default EditCategoryForm