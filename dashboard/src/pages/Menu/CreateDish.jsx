import React from 'react'
import Header from './common/Header'
import FormDish from './form/FormDish'
import {useCreateDishLogic} from './logic'

const CreateDish = () => {
  const { categories, createDish, cancel, uploadFile } = useCreateDishLogic()

  return (
    <div className="form_dish">
      <Header />
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <FormDish onSubmit={createDish} onCancel={cancel} categories={categories} uploadFile={uploadFile} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateDish