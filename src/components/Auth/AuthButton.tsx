import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'
import AuthModal from './AuthModal'
import {Button} from '@material-ui/core'
import {authProfileType, authRegProfileType} from '../../types/types'
import {registration, login, logoutAC} from '../../redux/auth-reducer'


const AuthButton = () => {
    const isAuthenticated = useSelector((state: AppStateType) => state.authPage.isAuthenticated)
    const dispatch = useDispatch()
    const loginFunc = useCallback((profile: authProfileType) => {
        dispatch(login(profile))
    }, [dispatch])
    const logoutFunc = useCallback(() => {
        dispatch(logoutAC())
    }, [dispatch])
    const registrationFunc = useCallback((profile: authRegProfileType) => {
        dispatch(registration(profile))
    }, [dispatch])
    const [isOpen, setIsOpen] = useState(false)

    const signUpSubmit = (profile: authProfileType) => {
        loginFunc(profile)
    }

    const signOutSubmit = () => {
        logoutFunc()
        setIsOpen(false)
    }

    const registrationSubmit = (profile: authRegProfileType) => {
        registrationFunc(profile)
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        isAuthenticated
            ?
            <div>
                <Button variant='contained' onClick={signOutSubmit}>Выйти</Button>
            </div>
            :
            <div>
                <Button variant='outlined' onClick={toggle}>Войти</Button>
                <AuthModal isOpen={isOpen} onClose={toggle} signUpSubmit={signUpSubmit}
                           registrationSubmit={registrationSubmit}/>
            </div>
    )
}

export default AuthButton
