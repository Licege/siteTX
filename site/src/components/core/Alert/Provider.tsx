import React, { FC, useState, createContext } from 'react'
import { Color } from '@material-ui/lab/Alert'

export interface IAlert {
    isOpen: boolean
    message: string
    type: Color
}

export interface ISetAlert {
    isOpen: boolean
    type?: Color
    message: string
}

export interface IAlertContext {
    alert: IAlert
    setAlert: ({ isOpen, type, message }: ISetAlert) => void
    onClose: (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => void
}

export const AlertContext = createContext<IAlertContext|null>(null);
AlertContext.displayName = 'AlertContext';

const AlertProvider: FC = ({ children }) => {
    const [isOpen, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState<Color>('success')

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason? : string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false)
    }

    const setAlert = ({ isOpen, type, message }: ISetAlert) => {
        setOpen(isOpen)
        setMessage(message)
        if (type) {
            setType(type)
        }
    }

    return (
        <AlertContext.Provider value={{ alert: { isOpen, message, type }, setAlert, onClose: handleClose }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider