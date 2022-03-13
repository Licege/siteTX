import {useDispatch} from 'react-redux'

import {useGlobalDeliverySettings} from '../../../../../redux/hooks/hooks'
import {updateGlobalDeliverySettings} from '../../../../../redux/thunks/delivery.thunks'

export const useGlobalSettingsFormLogic = () => {
  const dispatch = useDispatch()

  const globalSettings = useGlobalDeliverySettings()

  const postGlobalSettings = settings => dispatch(updateGlobalDeliverySettings(settings))

  return {globalSettings, postGlobalSettings}
}