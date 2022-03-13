import React from 'react'
import {useSelector} from 'react-redux'
import {getCurrentModal} from '../../redux/getters/modals.getters'

import ModalDelete from './ModalDelete'
import ModalMenu from './ModalMenu'

const MODALS = {
  SIMPLE_DELETE: ModalDelete,
  MENU: ModalMenu
}

const ModalRoot = () => {
  const currentModal = useSelector(getCurrentModal)

  if (!currentModal) return null

  const CurrentModal = MODALS[currentModal.name]

  if (!CurrentModal) {
    console.error(`Not found modal with name "${currentModal.name}"`)
    return <></>
  }

  return <CurrentModal {...currentModal.props} />
}

export default ModalRoot;