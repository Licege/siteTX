import React from 'react'
import { createStyles, Modal, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'

interface IProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactElement
}

const useStyles = makeStyles(( theme: Theme ) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 600,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
)


const CustomModal = ( {isOpen, onClose, children}: IProps ) => {
    const classes = useStyles()
    return (
        <Modal open={isOpen} onClose={onClose} className={classes.modal}>
            <Fade in={isOpen}>
                <div className={classes.paper}>
                    {children}
                </div>
            </Fade>
        </Modal>
    )
}

export default CustomModal
