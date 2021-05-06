import React from 'react'
import { Button } from '@material-ui/core'
import DropdownMenu from "./DropdownMenu";
import {useAuthButtonLogic} from "./logic";


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
