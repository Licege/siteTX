import React, { useState } from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import Login from './Login'
import Registration from './Registration'
import { authProfileType, authRegProfileType } from '../../types/types'

interface IProps {
    isOpen: boolean
    onClose: () => void
    signUpSubmit: (profile: authProfileType) => void
    registrationSubmit: (profile: authRegProfileType) => void
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const AuthModal = ({ isOpen, onClose, signUpSubmit, registrationSubmit }: IProps) => {
    const [signUp, signMode] = useState(true)

    const toggle = () => {
        signMode(!signUp)
    }

    return (
        <Dialog open={isOpen} onClose={onClose} disableBackdropClick TransitionComponent={Transition}>
            {signUp
                ?
                <>
                    <DialogTitle className='text-center'>Авторизация</DialogTitle>
                    <DialogContent><Login onSubmit={signUpSubmit}/></DialogContent>
                    <Button variant='text' onClick={toggle}>Еще нет аккаунта?</Button>
                </>
                :
                <>
                    <DialogTitle className='text-center'>Регистрация</DialogTitle>
                    <DialogContent><Registration onSubmit={registrationSubmit}/></DialogContent>
                    <Button variant='text' onClick={toggle}>Уже зарегистрированны?</Button>
                </>
            }
        </Dialog>
    )
}

export default AuthModal
