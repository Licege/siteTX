import { useHistory } from 'react-router-dom'
import {useDeliveryCommonSettings} from '../../../../../redux/hooks/hooks'

export const useDeliverySettingsTableLogic = () => {
  const history = useHistory()

  const settings = useDeliveryCommonSettings()

  const redirectToEditSettings = id => () => history.push(`delivery-settings/edit/${id}`)

  return { settings, redirectToEditSettings }
}

export const useDeliverySettingsHeaderLogic = () => {
  const history = useHistory()

  const redirectToCreateSettings = () => history.push(`delivery-settings/new`)

  return { redirectToCreateSettings }
}