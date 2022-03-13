import React from 'react'
import {Button} from 'react-bootstrap'
import {PageHeader} from '../../../styledComponents/components'
import {useDeliverySettingsHeaderLogic} from './Tabs/Common_Settings/logic'

const Header = () => {
  const {redirectToCreateSettings} = useDeliverySettingsHeaderLogic()

  return (
    <PageHeader title='Настройки доставки'>
      <Button variant='primary' onClick={redirectToCreateSettings}>Добавить новый пункт доставки</Button>
    </PageHeader>
  )
}

export default Header