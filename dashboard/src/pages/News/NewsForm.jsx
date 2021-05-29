import React from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-final-form'
import { SCInputField, SCTextareaField } from './styledComponents';
import ImageInput from '../../components/common/imageInput'
import {PageHeader} from '../../styledComponents/components'

const RenderForm = ({ handleSubmit, pristine, submitting, news, uploadFile, cancel }) => (
  <form onSubmit={handleSubmit}>
    <SCInputField name='title' placeholder='Название' />
    <SCTextareaField name='shortDescription'
                     placeholder='Краткое описание новости'
    />
    <SCTextareaField name='description'
                     placeholder='Полное описание новости'
    />
    <div>
      <ImageInput value={news ? news.imageSrc : ''} onChange={uploadFile} allowClear={true} />
    </div>
    <Button onClick={cancel} variant='outline-secondary'>Отменить</Button>
    <Button type='submit' variant='primary' disabled={pristine || submitting}>Сохранить</Button>
  </form>
)


const NewsForm = ({ onSubmit, initialValues, ...props }) => (
  <Form onSubmit={onSubmit}
        initialValues={initialValues}
        render={formProps => <RenderForm { ...formProps} {...props } />} />
)

export default NewsForm
