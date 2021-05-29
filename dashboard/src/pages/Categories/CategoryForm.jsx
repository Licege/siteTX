import React from 'react'
import { Button } from 'react-bootstrap'
import { SCInputField } from './styledComponents'

const CategoryForm = ({ handleSubmit, pristine, submitting, cancel }) => (
  <form onSubmit={handleSubmit}>
    <SCInputField name="title" placeholder="Название категории" />
    <SCInputField name="titleEn" placeholder="Ссылка для адресной строки" />
    <div>
      <label htmlFor="isDeliveryCategory">Доставка</label>
      <SCInputField name="isDelivery"
                     id="is_delivery_category"
                     type="checkbox"
      />
    </div>
    <div>
      <Button variant="outline-secondary" onClick={cancel}>Отмена</Button>
      <Button variant="primary"
              type="submit"
              disabled={pristine || submitting}
      >Сохранить</Button>
    </div>
  </form>
)

export default CategoryForm
