import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import renderTextField from '../common/elements/RenderTextField'
import { Button } from '@material-ui/core'
import validate from './LoginValidate'
import { authProfileType } from '../../types/types'


const Login: React.FC<InjectedFormProps<authProfileType>> = ({
                                                                 handleSubmit,
                                                             }) => {
    return (
        <form className='form_login' onSubmit={handleSubmit}>
            <Field className='form_login__field'
                   name='email'
                   component={renderTextField}
                   label='E-mail*'
                   placeholder='Введите e-mail'/>
            <Field className='form_login__field'
                   name='password'
                   component={renderTextField}
                   type='password' label='Пароль*'
                   placeholder='Введите пароль'/>
            <Button variant='contained' color='primary' type='submit'>Войти</Button>
        </form>
    )
}

let loginForm = reduxForm<authProfileType>({ form: 'loginForm', validate })(Login)

export default loginForm
