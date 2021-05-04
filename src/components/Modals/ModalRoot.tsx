import React from 'react'
import { useSelector } from 'react-redux'
import { getCurrentModal } from '../../redux/getters/modals.getters'
import ModalRegister from './ModalRegister/ModalRegister'
import ModalAuth from './ModalAuth/ModalAuth'
import ModalDishInfo from './ModalDishInfo'

const MODALS: any = {
  REGISTER: ModalRegister,
  AUTH: ModalAuth,
  DISH_INFO: ModalDishInfo
}

const ModalRoot = () => {
  const currentModal = useSelector(getCurrentModal)

  if (!currentModal) return null

  const CurrentModal = MODALS[currentModal.name]

  if (!CurrentModal) {
    console.error(`Not found modal with name "${currentModal.name}"`)
    return null
  }

  return <CurrentModal {...currentModal.props} />
}

export default ModalRoot