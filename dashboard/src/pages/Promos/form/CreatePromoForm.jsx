import React from 'react'
import { useCreatePromoLogic } from '../logic'
import PromoForm from './PromoForm'

const CreatePromoFrom = () => {
  const { changeDescription, uploadFile, createPromo, cancel } = useCreatePromoLogic()

  return (
    <PromoForm onSubmit={createPromo} changeDescription={changeDescription} uploadFile={uploadFile} cancel={cancel} />
  )
}

export default CreatePromoFrom