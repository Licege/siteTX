import React from 'react'
import {useEditPromoLogic} from '../logic'
import PromoForm from './PromoForm'

const EditPromoForm = () => {
  const {promo, editPromo, cancel, uploadFile, changeDescription} = useEditPromoLogic();

  return (
    <PromoForm onSubmit={editPromo} initialValues={promo} promo={promo} uploadFile={uploadFile} changeDescription={changeDescription} cancel={cancel} />
  )
}

export default EditPromoForm