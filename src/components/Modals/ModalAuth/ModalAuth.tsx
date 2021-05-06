import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import Login from '../../../pages/Auth/Login'
import {useModalAuthLogic} from "./logic";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const ModalAuth = () => {
    const { submit, showRegisterModal, hideModal } = useModalAuthLogic()

    return (
        <Dialog open onClose={hideModal} onEscapeKeyDown={hideModal} TransitionComponent={Transition}>
            <div className='modal-auth'>
                <DialogTitle className='text-center'>Авторизация</DialogTitle>
                <DialogContent>
                    <Login onSubmit={submit}/>
                </DialogContent>
                <div className='d-flex justify-content-center'>
                    <Button variant='text' onClick={showRegisterModal}>Еще нет аккаунта?</Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ModalAuth
