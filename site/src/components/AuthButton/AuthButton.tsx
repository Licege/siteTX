import React from 'react'
import DropdownMenu from './DropdownMenu';
import { useAuthButtonLogic } from './logic';
import { Button } from '../core'


const AuthButton = () => {
  const { isAuthenticated, showAuthModal } = useAuthButtonLogic()

  return (
    isAuthenticated
      ?
        <DropdownMenu />
      :
        <div>
          <Button variant='outlined' color='primary' onClick={showAuthModal}>
            Войти
          </Button>
        </div>
  )
}

export default AuthButton
