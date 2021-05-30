import React from 'react'
import CreatePromoForm from './form/CreatePromoForm'
import {PageHeader} from '../../styledComponents/components'

const CreatePromo = () => (
    <div>
      <PageHeader title='Создание акции' />
      <div className="page-header">
        <div className="page-header-title">Создание акции</div>
      </div>
      <div className="page-container">
        <CreatePromoForm />
      </div>
    </div>
  )

export default CreatePromo