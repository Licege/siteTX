import React from 'react'
import {useEditPromoLogic} from '../logic'
import PromoForm from './PromoForm'

const EditPromoForm = () => {
  const {promo, editPromo, cancel, uploadFile, changeDescription, file, description} = useEditPromoLogic()

  return (
    <PromoForm onSubmit={editPromo} initialValues={promo} promo={promo} uploadFile={uploadFile} changeDescription={changeDescription} cancel={cancel} file={file} description={description} />
  )
}

export default EditPromoForm