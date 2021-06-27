import React from 'react'
import { Form, Field } from 'react-final-form'
import styled from 'styled-components'
import TextField from '../../components/common/elements/form/RenderTextField'
// import validate from './RegistrationValidate'
// import { authRegProfileType } from '../../types/types'
import { Button } from '../../components/core'


const Registration: React.FC<any> = ({ onSubmit }: any) => (
  <Form onSubmit={onSubmit} render={({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <FormContent>
        <Field name='surname' component={TextField} label='Фамилия' placeholder='Введите фамилию'/>
        <Field name='forename' component={TextField} label='Имя*' placeholder='Введите имя'/>
        <Field name='patronymic' component={TextField} label='Отчество' placeholder='Введите отчество'/>
        <Field name='phone' component={TextField} label='Телефон*' placeholder='+7(999)999-99-99'/>
        <Field name='email' component={TextField} label='Email*' placeholder='Введите email'/>
        <Field name='password' component={TextField} type='password' label='Пароль*' placeholder='Введите пароль'/>
        <Field name='confirmPassword' component={TextField} type='password' label='Повторите пароль*' placeholder='Введите пароль'/>
      </FormContent>
      <Actions>
        <Button variant='contained' color='primary' type='submit'>Зарегистрироваться</Button>
      </Actions>
    </form>
  )} />
)

const FormContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  margin-bottom: 32px;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`

export default Registration
