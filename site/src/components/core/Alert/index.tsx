import React, { useContext } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { AlertContext } from './Provider'


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}


const CustomAlert = () => {
    const alertContext = useContext(AlertContext)

    if (!alertContext) return null;

    const { alert, onClose } = alertContext

    return (
        <Snackbar open={alert.isOpen} autoHideDuration={3000}>
            <Alert onClose={onClose} severity={alert.type}>
                {alert.message}
            </Alert>
        </Snackbar>
    )
}

export default CustomAlert