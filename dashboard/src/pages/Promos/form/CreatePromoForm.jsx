import React from 'react'
import {useCreatePromoLogic} from '../logic'
import PromoForm from './PromoForm'

const CreatePromoFrom = () => {
  const {changeDescription, uploadFile, createPromo, cancel, description, file} = useCreatePromoLogic()

  return (
    <PromoForm onSubmit={createPromo} changeDescription={changeDescription} uploadFile={uploadFile} cancel={cancel} description={description} file={file} />
  )
}

export default CreatePromoFrom