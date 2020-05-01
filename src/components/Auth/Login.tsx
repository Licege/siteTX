import React from 'react'
import {InjectedFormProps, Field, reduxForm} from "redux-form";
import renderTextField from "../common/elements/RenderTextField";
import {Button} from "@material-ui/core";
import {authProfileType} from "../../types/types";


const Login: React.FC<InjectedFormProps> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name='email' component={renderTextField} label='E-mail*' placeholder='Введите e-mail' />
            <Field name='password' component={renderTextField} type='password' label='Пароль*' placeholder='Введите пароль' />
            <Button variant='contained' type='submit'>Войти</Button>
        </form>
    )
}

let loginForm = reduxForm<authProfileType>({form: 'loginForm'})(Login)

export default loginForm;