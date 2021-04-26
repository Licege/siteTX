import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import Registration from '../../../pages/Auth/Registration'
import { useModalRegisterLogic } from "./logic";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})

const ModalRegister = () => {
    const { submit, showAuthModal, hideModal } = useModalRegisterLogic()

    return (
        <Dialog open onClose={hideModal} onEscapeKeyDown={hideModal} TransitionComponent={Transition}>
            <div className='modal-registration'>
                <DialogTitle className='text-center'>Регистрация</DialogTitle>
                <DialogContent>
                    <Registration onSubmit={submit}/>
                </DialogContent>
                <Button variant='text' onClick={showAuthModal}>Уже зарегистрированы?</Button>
            </div>
        </Dialog>
    )
}

export default ModalRegister
