import React from 'react'
import {useEditDishLogic} from './logic'
import Header from './common/Header'
import FormDish from './form/FormDish'

const EditDish = () => {
  const {dish, categories, editDish, cancel, openDelModal, uploadFile} = useEditDishLogic()

  if (!dish) return <div />

  return (
    <div className="form_dish">
      <Header title={dish.title} openDelModal={openDelModal} />
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <FormDish onSubmit={editDish} onCancel={cancel} initialValues={dish} categories={categories} uploadFile={uploadFile} dishImageSrc={dish.imageSrc} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDish