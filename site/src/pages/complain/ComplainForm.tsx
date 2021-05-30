import React from 'react'
import { Field, Form } from 'react-final-form'
import Select from '../../components/common/elements/form/RenderSelect'
import Datepicker from '../../components/common/elements/form/RenderDatepicker'
import TextField from '../../components/common/elements/form/RenderTextField'
import Button from '@material-ui/core/Button'
import validate from './Validate'
import { complainType, selectOptionsType } from '../../types/types'
import styled from 'styled-components'
import { Container } from '@material-ui/core'

const ComplainForm: React.FC<any> = ({types, onSubmit}) => {
  return (
    <Form onSubmit={onSubmit} render={({handleSubmit}) => (
      <FormContent onSubmit={handleSubmit}>
        <Field name="typeId" component={Select} options={types} defaultValue={types[0]} label="Тема обращения" />
        <Field name="name" component={TextField} label="Ваше имя" />
        <Row>
          <Field name="email" component={TextField} label="Ваш e-mail" />
          <Field name="phone" component={TextField} label="Ваш телефон" />
        </Row>
        {/*<Field name='visitDate' component={Datepicker} label='Дата и время посещения' showTimeSelect />*/}
        <Field name="text" component={TextField} label="Сообщение" as="textarea" rows={6} />
        <ActionsBlock>
          <Button variant="contained" color="primary" type="submit">Отправить</Button>
        </ActionsBlock>
      </FormContent>
    )}
    />

  )
}

const FormContent = styled.div`
  padding: 24px;
  background-color: #fff;
  border: 1px solid ${props => props.theme.colors.borderColor};
  max-width: 674px;
  margin: 0 auto;
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

// const ComplainReduxForm = reduxForm<complainType & IMapStateToProps, PropsType>({
//     form: 'complain-redux-form',
//     validate,
//     enableReinitialize: true
// })(ComplainForm)

export default ComplainForm