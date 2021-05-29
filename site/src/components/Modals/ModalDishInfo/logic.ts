import { useMenuActions } from '../../../redux/hooks/menu.hooks'
import { useModalActions } from '../../../redux/hooks/app.hooks'

const useModalDishInfoLogic = () => {
  const { hideModal } = useModalActions()
  const { addDishToBucket } = useMenuActions()

  return { addDishToBucket, hideModal }
}

export default useModalDishInfoLogic