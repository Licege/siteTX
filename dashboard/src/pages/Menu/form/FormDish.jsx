import React from 'react'
import {Form} from 'react-final-form'
import Button from 'react-bootstrap/Button'
import {CheckboxWithLabel} from '../../../styledComponents/atoms'
import {SCInputField, SCSelectField} from '../styledComponents'
import {prepareOptions} from '../../../components/Form'
import ImageInput from '../../../components/common/imageInput'


const RenderForm = ({handleSubmit, submitting, pristine, categories = [], dishImageSrc = '', onCancel, uploadFile}) => (
  <form onSubmit={handleSubmit}>
    <SCInputField name='title' placeholder='Название' />
    <SCInputField name='description' placeholder='Описание' />
    <div>
      <label>Категории</label>
      <SCSelectField name='categoryId'
                     placeholder='Выберите категорию'
                     options={prepareOptions(categories, {value: 'id', name: 'title', withEmpty: true})}/>
    </div>
    <SCInputField name='weight' placeholder='Вес порции (г.)' />
    <SCInputField name='cost' placeholder='Цена' />
    <CheckboxWithLabel>
      <label>
        <SCInputField name="isDelivery" type="checkbox" />&nbsp;&nbsp;Доставка
      </label>
    </CheckboxWithLabel>
    <div>
      <ImageInput value={dishImageSrc} onChange={uploadFile} allowClear={true} />
    </div>
    <div className="form_dish__actions">
      <Button variant="secondary" type="button" onClick={onCancel} disabled={submitting}>Отменить</Button>
      <Button variant="primary" type="submit" disabled={submitting || pristine}>Сохранить</Button>
    </div>
  </form>
)

const FormDish = ({onSubmit, initialValues, ...props}) => (
  <Form onSubmit={onSubmit}
        initialValues={initialValues}
        render={formProps => <RenderForm {...formProps} {...props} />}/>
)

export default FormDish
