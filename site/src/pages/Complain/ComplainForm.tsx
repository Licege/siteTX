import React from 'react'
import { Form, Field } from 'react-final-form'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import Select from '../../components/common/elements/form/RenderSelect'
// import Datepicker from '../../components/common/elements/form/RenderDatepicker'
import TextField from '../../components/common/elements/form/RenderTextField'
import { useComplainFormLogic } from './logic';
import validate from './Validate'

const ComplainForm = () => {
  const { initialValues, types, onSubmit } = useComplainFormLogic()

  if (!types.length) return null

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate} render={({ handleSubmit }) => (
      <FormContent onSubmit={handleSubmit}>
        <Field name="typeId" component={Select} options={types} label="Тема обращения" />
        <Field name="name" component={TextField} label="Ваше имя" />
        <Row>
          <Field name="email" component={TextField} label="Ваш e-mail" />
          <Field name="phone" component={TextField} label="Ваш телефон" />
        </Row>
        {/* <Field name='visitDate' component={Datepicker} label='Дата и время посещения' showTimeSelect /> */}
        <Field name="text" component={TextField} placeholder="Введите текст..." label="Сообщение" as="textarea" rows={6} />
        <ActionsBlock>
          <Button variant="contained" color="primary" type="submit">Отправить</Button>
        </ActionsBlock>
      </FormContent>
        )}/>
  )
}

const FormContent = styled.form`
  padding: 24px;
  background-color: #fff;
  border: 1px solid ${props => props.theme.colors.borderColor};
  max-width: 674px;
  margin: 0 auto;

  .error {
    .text-field__prompt {
      color: #800;
    }
  }
`

const Row = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
`

const ActionsBlock = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
`

export default ComplainForm