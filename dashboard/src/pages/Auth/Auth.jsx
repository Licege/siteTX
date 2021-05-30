import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'
import { Button } from 'react-bootstrap'

import { login } from '../../redux/thunks/auth.thunks'

const renderForm = ({ handleSubmit, pristine, submitting }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field name="email"
             className="form-control mb-3"
             component="input"
             placeholder="Введите логин"
      />
    </div>
    <div>
      <Field name="password"
             className="form-control mb-3"
             component="input"
             type="password"
             placeholder="Введите пароль"
      />
    </div>
    <div className="auth-wrapper-actions">
      <Button className="auth-wrapper-actions-btn"
              variant="primary"
              type="submit"
              disabled={pristine || submitting}
      >
        Войти
      </Button>
    </div>
  </form>
)

const Auth = () => {
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  if (isAuth) {
    window.location.reload()
  }

  const dispatch = useDispatch();

  const onSubmit = (data) => dispatch(login(data));

  return (
    <div className="auth">
      <div className="auth-wrapper">
        <div className="auth-wrapper-title">Вход в систему</div>
        <Form onSubmit={onSubmit} render={renderForm} />
      </div>
    </div>
  )
}

export default Auth
