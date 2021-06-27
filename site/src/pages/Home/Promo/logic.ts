import { useSelector } from 'react-redux';
import { isPromosExist } from '../../../redux/getters/promos.getters'

export const useSectionPromosLogic = () => ({
  isPromosExist: useSelector(isPromosExist)
})