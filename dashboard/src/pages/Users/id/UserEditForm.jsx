import React from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-final-form'
import { SCInputField } from '../styledComponents'
import {PageHeader} from '../../../styledComponents/components'


const RenderForm = ({ handleSubmit, submitting, pristine, cancel }) => (
  <form onSubmit={handleSubmit}>
      <SCInputField name='surname' placeholder='Фамилия' />
      <SCInputField name='forename' placeholder='Имя' />
      <SCInputField name='email' placeholder='E-mail' />
      <SCInputField name='phone' placeholder='Телефон' />
      <SCInputField name='bonusPoints' placeholder='Бонусы' parse={value => Number(value)} />
      <Button variant="primary" type="submit" disabled={submitting || pristine}>Сохранить</Button>
      <Button variant="secondary" type="button" onClick={cancel} disabled={submitting}>Отменить</Button>
  </form>
)

const UserEditForm = ({ onSubmit, profile, ...props }) => {
  return (
    <div>
      <PageHeader title={`Редактирование пользователя: ${profile.email}`} />
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <Form onSubmit={onSubmit} render={({ ...formProps }) => <RenderForm {...formProps} {...props} />} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEditForm
