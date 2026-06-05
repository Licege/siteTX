import React from 'react'
import {Form} from 'react-final-form'
import {Button} from 'react-bootstrap'
//import EditorFieldComponent from "../common/element/editor/EditorFieldComponent";
import ImageInput from '../../../components/common/imageInput'
import ControlledEditor from '../../../components/common/element/editor/ControlledEditor'
import {SCInputField, SCTextareaField} from '../styledComponents'
import {CheckboxWithLabel} from '../../../styledComponents/atoms'

const emptyValues = {
  title: '',
  shortDescription: '',
  show: true
}

const normalizePromoValues = (values) => {
  if (!values) return emptyValues

  return {
    ...values,
    title: values.title ?? '',
    shortDescription: values.shortDescription ?? '',
    show: values.show ?? true
  }
}

const nullSafeValue = value => value ?? ''

const RenderForm = ({handleSubmit, submitting, pristine, promo, changeDescription, uploadFile, cancel, file, description = ''}) => {
  const initialDescription = promo?.description ?? ''
  const hasChanges = !pristine || !!file || description !== initialDescription

  return (
    <form onSubmit={handleSubmit}>
      <SCInputField name='title' placeholder='Название' />
      <SCTextareaField name='shortDescription' placeholder='Краткое описание (необязательно)' parse={nullSafeValue} format={nullSafeValue} />
      <div className="promos-form-wysivyg">
        <ControlledEditor value={description} onChange={changeDescription} />
      </div>
      <CheckboxWithLabel>
        <label>
          Показывать акцию&nbsp;&nbsp;<SCInputField type='checkbox' name='show' />
        </label>
      </CheckboxWithLabel>
      <div>
        <ImageInput value={promo?.imageSrc || ''} onChange={uploadFile} allowClear={true} />
      </div>
      <div>
        <Button variant="secondary" type="button" onClick={cancel} disabled={submitting}>Отменить</Button>
        <Button variant="primary" type="submit" disabled={submitting || !hasChanges}>Сохранить</Button>
      </div>
    </form>
  )
}

const PromoForm = ({onSubmit, initialValues, ...props}) => {
  const normalizedInitialValues = normalizePromoValues(initialValues)

  return (
    <Form key={normalizedInitialValues.id || 'new'} onSubmit={onSubmit} initialValues={normalizedInitialValues} render={formProps => <RenderForm {...formProps} {...props} />} />
  )
}

export default PromoForm
