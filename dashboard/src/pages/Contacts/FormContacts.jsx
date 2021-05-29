import React from 'react'
import {Form} from 'react-final-form'
import {Button} from 'react-bootstrap'
import {SCInputField} from './styledComponents'
import InputsList from '../../components/common/InputsList'

const FIELDS = [
  { name: 'phone', placeholder: 'Телефон' },
  { name: 'address', placeholder: 'Адрес' },
  { name: 'vk', placeholder: 'Вконтакте' },
  { name: 'fb', placeholder: 'Facebook' },
  { name: 'tg', placeholder: 'Телеграм' },
  { name: 'inst', placeholder: 'Instagram' },
  { name: 'google', placeholder: 'Google' },
  { name: 'tw', placeholder: 'Twitter' },
]

const RenderForm = ({ handleSubmit, submitting, pristine, cancel, openHours, handleInputField }) => (
  <form onSubmit={handleSubmit}>
    {FIELDS.map(({ ...fieldProps }) => <SCInputField {...fieldProps} />)}
    <div>
      <div className="mb-3">Часы работы (укажите часы работы в формате ПН-ПТ: 12:00 - 01:00)
      </div>
      <InputsList items={openHours} placeholder='Добавьте часы работы' onChange={handleInputField} />
    </div>
    <Button variant="primary" type="submit" disabled={submitting || pristine}>Изменить</Button>
    <Button variant="outline-secondary" type="button"
            onClick={cancel}
    >
      Отменить
    </Button>
  </form>
)

const FormContacts = ({ onSubmit, initialValues, ...props }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues} render={formProps => <RenderForm {...formProps} {...props} />} />
)

export default FormContacts