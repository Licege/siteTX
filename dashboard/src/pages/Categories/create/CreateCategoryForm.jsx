import React from 'react'
import {Form} from 'react-final-form'
import {useCreateCategoryLogic} from '../logic'
import CategoryForm from '../CategoryForm'

const CreateCategoryForm = () => {
  const {createNewCategory, cancel, validate} = useCreateCategoryLogic()

  return (
    <Form onSubmit={createNewCategory} validate={validate} render={({...formProps}) => <CategoryForm {...formProps} cancel={cancel} />} />
  )
}

export default CreateCategoryForm