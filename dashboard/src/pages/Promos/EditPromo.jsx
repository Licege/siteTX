import React from 'react'
import {useCurrentPromo} from './logic'
import EditPromoForm from './form/EditPromoForm'
import {PageHeader} from '../../styledComponents/components'

const EditPromo = () => {
  const promo = useCurrentPromo();

  if (!promo) return <div />

  const {title} = promo

  return (
    <div>
      <PageHeader title={`Редактирование акции ${title}`} />
      <div className="page-container">
        <EditPromoForm />
      </div>
    </div>
  )
}

export default EditPromo;