import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppStateType } from '../../redux/redux-store'
import AuthModal from './AuthModal'
import { Button } from '@material-ui/core'
import { authProfileType, authRegProfileType } from '../../types/types'
import { actions, login, registration } from '../../redux/auth-reducer'
import { Dropdown } from 'react-bootstrap';


const AuthButton = () => {
    const history = useHistory()
    const isAuthenticated = useSelector((state: AppStateType) => state.authPage.isAuthenticated)
    const dispatch = useDispatch()
    const loginFunc = useCallback((profile: authProfileType) => {
        dispatch(login(profile))
    }, [dispatch])
    const logoutFunc = useCallback(() => {
        dispatch(actions.logout())
    }, [dispatch])
    const registrationFunc = useCallback((profile: authRegProfileType) => {
        dispatch(registration(profile))
    }, [dispatch])
    const [isOpen, setIsOpen] = useState(false)

    const signUpSubmit = (profile: authProfileType) => {
        loginFunc(profile)
    }

    const goToProfile = () => {
        history.push('/me')
    }

    const logout = () => {
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
                {/*<Button variant='contained' color='secondary' onClick={signOutSubmit}>Выйти</Button>*/}
                <Dropdown>
                    <Dropdown.Toggle>
                        Профиль
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={goToProfile}>Профиль</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            :
            <div>
                <Button variant='outlined' color='primary' onClick={toggle}>
                    Войти
                </Button>
                <AuthModal isOpen={isOpen}
                           onClose={toggle}
                           signUpSubmit={signUpSubmit}
                           registrationSubmit={registrationSubmit} />
            </div>
    )
}

export default AuthButton
