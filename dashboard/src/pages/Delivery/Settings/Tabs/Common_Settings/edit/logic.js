import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useCurrentDeliverySettings} from '../../../../../../redux/hooks/hooks'
import {updateDeliverySettings} from '../../../../../../redux/thunks/delivery.thunks'

export const useEditDeliverySettingsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const currentSettings = useCurrentDeliverySettings()

  const editSettings = settings => {
    dispatch(updateDeliverySettings(settings))
    history.push(`/delivery-settings`)
  }

  const cancel = () => history.push(`/delivery-settings`)

  return { currentSettings, editSettings, cancel }
}