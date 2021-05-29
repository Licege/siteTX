import React from 'react'
import {PageHeader} from '../../../../../../styledComponents/components'
import SettingsForm from '../SettingsForm'
import {useCreateDeliverySettingsLogic} from './logic'

const CreateSettings = () => {
  const { createSettings, cancel } = useCreateDeliverySettingsLogic()

  return (
    <div className='page form_delivery'>
      <PageHeader title='Создание новой зоны доставки' />
      <SettingsForm onSubmit={createSettings} cancel={cancel} />
    </div>
  )
}

export default CreateSettings