import React from 'react'
import {PageHeader} from '../../../../../../styledComponents/components'
import SettingsForm from '../SettingsForm'
import {useEditDeliverySettingsLogic} from './logic'

const EditSettings = () => {
  const { currentSettings, editSettings, cancel } = useEditDeliverySettingsLogic()

  if (!currentSettings) return <div />

  const title = `Редактирование доставки в ${currentSettings.city}`

  return (
    <div className='page form_delivery'>
      <PageHeader title={title} />
      <SettingsForm onSubmit={editSettings}
                    currentSettings={currentSettings}
                    cancel={cancel}
      />
    </div>
  )
}

export default EditSettings