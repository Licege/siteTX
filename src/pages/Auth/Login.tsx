import React from 'react'
import {Form, Field} from 'react-final-form'
import renderTextField from '../../components/common/elements/form/RenderTextField'
import {Button} from '@material-ui/core'


const Login: React.FC<any> = ({ onSubmit }: any) => {
    return (
      <Form onSubmit={onSubmit} render={({ handleSubmit }) => (
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
          <div className='form_login__submit'>
            <Button variant='contained' color='primary' type='submit'>Войти</Button>
          </div>
        </form>
      )} />
    )
}

export default Login
