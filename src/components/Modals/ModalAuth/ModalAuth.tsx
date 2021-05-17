import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import Login from '../../../pages/Auth/Login'
import {useModalAuthLogic} from "./logic";
import { ActionsBlock, Wrapper } from './styles'
import { Button } from '../../core'

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
            <Wrapper>
                <DialogTitle className='text-center'>Авторизация</DialogTitle>
                <DialogContent>
                    <Login onSubmit={submit}/>
                </DialogContent>
                <ActionsBlock>
                    <Button variant='text' onClick={showRegisterModal}>Еще нет аккаунта?</Button>
                </ActionsBlock>
            </Wrapper>
        </Dialog>
    )
}

export default ModalAuth
