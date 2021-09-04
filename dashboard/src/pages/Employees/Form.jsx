import React from 'react'
import { Form } from 'react-final-form'
import { Button } from "react-bootstrap";
import {InputWithLabelField, InputPhoneWithLabelField, SelectWithLabelField, TextareaWithLabelField} from '../../components/Form'
import ImageInput from "../../components/common/imageInput";
import { FormLayout } from "../../styledComponents/atoms";
import styled from "styled-components";
import InputNumberFieldWithLabel from "../../components/Form/Fields/inputNumberFieldWithLabel";


const RenderForm = ({ handleSubmit, submitting, pristine, employee, uploadFile, positions = [], cancel }) => (
  <FormLayout onSubmit={handleSubmit}>
    <FirstBlock>
      <div>
        <ImageInput value={employee ? employee.avatarSrc : ''} onChange={uploadFile} allowClear={true} />
      </div>
      <NameBlock>
        <InputWithLabelField name="lastName" placeholder="Введите фамилию" label="Фамилия" />
        <InputWithLabelField name="firstName" placeholder="Введите имя" label="Имя" />
        <InputWithLabelField name="middleName" placeholder="Введите отчество" label="Отчество" />
      </NameBlock>
    </FirstBlock>


    <SelectWithLabelField name="positionId" placeholder="Укажите должность" options={positions} label="Должность" />
    <InputNumberFieldWithLabel name="salary" inputMode="numeric" placeholder="Укажите зарплату" suffix=" ₽" label="Зарплата" />
    <InputPhoneWithLabelField name="phone" placeholder="Введите телефон" label="Телефон" />
    <TextareaWithLabelField name="address" placeholder="Введите адрес" resize="vertical" label="Адрес" rows={6} />

    <ActionsBlock>
      <Button onClick={cancel} variant='outline-secondary'>Отменить</Button>
      <Button type='submit' variant='primary' disabled={pristine || submitting}>Сохранить</Button>
    </ActionsBlock>
  </FormLayout>
)

const EmployeeForm = ({ onSubmit, initialValues, ...props }) => (
  <Form onSubmit={onSubmit}
        initialValues={initialValues}
        render={formProps => <RenderForm {...formProps} {...props} />}
  />
)

export default EmployeeForm

const FirstBlock = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`

const NameBlock = styled.div`
  width: 100%;
`

const ActionsBlock = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`