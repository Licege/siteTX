import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import renderTextField from '../common/elements/form/RenderTextField'
import {Button} from '@material-ui/core'
import validate from './RegistrationValidate'
import {authRegProfileType} from '../../types/types'


const Registration: React.FC<InjectedFormProps<authRegProfileType>> = ({
                                                                           handleSubmit,
                                                                       }) => {
    return (
        <form className='form_registration' onSubmit={handleSubmit}>
            <div className='form_registration__wrapper'>
                <Field name='surname' component={renderTextField} label='Фамилия' placeholder='Введите фамилию'/>
                <Field name='forename' component={renderTextField} label='Имя*' placeholder='Введите имя'/>
                <Field name='patronymic' component={renderTextField} label='Отчество' placeholder='Введите отчество'/>
                <Field name='phone' component={renderTextField} label='Телефон*' placeholder='+7(999)999-99-99'/>
                <Field name='email' component={renderTextField} label='Email*' placeholder='Введите email'/>
                <Field name='password' component={renderTextField} type='password' label='Пароль*'
                       placeholder='Введите пароль'/>
                <Field name='confirmPassword' component={renderTextField} type='password' label='Повторите пароль*'
                       placeholder='Введите пароль'/>
            </div>
            <div className='form_registration__submit'>
                <Button variant='contained' color='primary' type='submit'>Зарегистрироваться</Button>
            </div>
        </form>
    )
}

let registrationForm = reduxForm<authRegProfileType>({form: 'registrationForm', validate})(Registration)

export default registrationForm
