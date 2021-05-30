import React from 'react'
import { Form } from 'react-final-form'
import { Button } from 'react-bootstrap'
//import EditorFieldComponent from "../common/element/editor/EditorFieldComponent";
import ImageInput from '../../../components/common/imageInput'
import ControlledEditor from '../../../components/common/element/editor/ControlledEditor'
import { SCInputField, SCTextareaField } from '../styledComponents'
import { CheckboxWithLabel } from '../../../styledComponents/atoms'


const RenderForm = ({ handleSubmit, submitting, pristine, promo, changeDescription, uploadFile, cancel }) => (
  <form onSubmit={handleSubmit}>
    <SCInputField name='title' placeholder='Название' />
    <SCTextareaField name='shortDescription' placeholder='Краткое описание (необязательно)' />
    <div className="promos-form-wysivyg">
      <ControlledEditor value={promo?.description || ''} onChange={changeDescription} />
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
      <Button variant="primary" type="submit" disabled={submitting || pristine}>Сохранить</Button>
    </div>
  </form>
)

const PromoForm = ({ onSubmit, initialValues, ...props }) => {
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} render={formProps => <RenderForm {...formProps} {...props} />} />
  )
}

export default PromoForm
