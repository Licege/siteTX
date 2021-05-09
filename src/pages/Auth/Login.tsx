import React from 'react'
import {Form, Field} from 'react-final-form'
import renderTextField from '../../components/common/elements/form/RenderTextField'
import { Button } from '../../components/core'
import styled from 'styled-components'


const Login: React.FC<any> = ({ onSubmit }: any) => {
    return (
      <Form onSubmit={onSubmit} render={({ handleSubmit }) => (
        <FormLogin onSubmit={handleSubmit}>
          <Field name='email'
                 component={renderTextField}
                 label='E-mail*'
                 placeholder='Введите e-mail'/>
          <Field name='password'
                 component={renderTextField}
                 type='password' label='Пароль*'
                 placeholder='Введите пароль'/>
          <Actions>
            <Button variant='contained' color='primary' type='submit'>Войти</Button>
          </Actions>
        </FormLogin>
      )} />
    )
}

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .MuiFormControl-root {
    margin-bottom: 16px;
  }
`

const Actions = styled.div`
  margin: 16px 0;
  button {
    width: 100%;
  }
`

export default Login
