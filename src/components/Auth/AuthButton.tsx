import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import AuthModal from './AuthModal';
import {Button} from "@material-ui/core";
import {authProfileType, authRegProfileType} from "../../types/types";
import {registration, login} from "../../redux/auth-reducer";


const AuthButton = () => {
    const isAuthenticated = useSelector((state: AppStateType) => state.authPage.isAuthenticated)
    const dispatch = useDispatch()
    const loginFunc = useCallback((profile: authProfileType) => {
        dispatch(login(profile))
    }, [])
    const registrationFunc = useCallback((profile: authRegProfileType) => {
        dispatch(registration(profile))
    }, [])
    const [isOpen, setIsOpen] = useState(false)

    const singUpSubmit = (profile: authProfileType) => {
        console.log(profile);
        //loginFunc(profile)
    }

    const registrationSubmit = (profile: authRegProfileType) => {
        console.log(profile)
        //registrationFunc(profile)
    }

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        isAuthenticated
            ? <div>ПРофайл</div>
            :
            <div>
                <Button variant='contained' onClick={toggle}>Авторизация</Button>
                <AuthModal isOpen={isOpen} onClose={toggle} signUpSubmit={singUpSubmit} registrationSubmit={registrationSubmit} />
            </div>
    )
}

export default AuthButton;