import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {createDeliverySettings} from '../../../../../../redux/thunks/delivery.thunks'

export const useCreateDeliverySettingsLogic = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const createSettings = settings => {
    dispatch(createDeliverySettings(settings))
    history.push(`/delivery-settings`)
  }

  const cancel = () => history.push(`/delivery-settings`)

  return { createSettings, cancel }
}