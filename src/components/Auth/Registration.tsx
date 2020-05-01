import React from 'react'
import {InjectedFormProps, Field, reduxForm} from "redux-form";
import renderTextField from "../common/elements/RenderTextField";
import {Button} from '@material-ui/core';
import {authRegProfileType} from "../../types/types";


const Registration: React.FC<InjectedFormProps> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field name='surname' component={renderTextField} label='Фамилия' placeholder='Введите фамилию' />
            <Field name='forename' component={renderTextField} label='Имя*' placeholder='Введите имя' />
            <Field name='patronymic' component={renderTextField} label='Отчество' placeholder='Введите отчество' />
            <Field name='phone' component={renderTextField} label='Телефон*' placeholder='+7 (999) 999-99-99' />
            <Field name='email' component={renderTextField} label='Email*' placeholder='Введите email' />
            <Field name='password' component={renderTextField} type='password' label='Пароль*' placeholder='Введите пароль' />
            <Field name='confirmPassword' component={renderTextField} type='password' label='Повторите пароль*' placeholder='Введите пароль'  />
            <Button variant='contained' type='submit'>Зарегистрироваться</Button>
        </form>
    )
}

let registrationForm = reduxForm<authRegProfileType>({form: 'registrationForm'})(Registration)

export default registrationForm;