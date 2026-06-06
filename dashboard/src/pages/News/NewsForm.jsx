import React from 'react'
import {Button} from 'react-bootstrap'
import {Form} from 'react-final-form'
import {SCInputField, SCTextareaField} from './styledComponents';
import ImageInput from '../../components/common/imageInput'
import ControlledEditor from '../../components/common/element/editor/ControlledEditor'
import {isEditorHtmlEqual} from '../../components/common/element/editor/normalizeEditorHtml'

const RenderForm = ({handleSubmit, pristine, submitting, news, uploadFile, changeDescription, cancel, file, description = ''}) => {
  const initialDescription = news?.description ?? ''
  const hasChanges = !pristine || !!file || !isEditorHtmlEqual(description, initialDescription)

  return (
    <form onSubmit={handleSubmit}>
      <SCInputField name='title' placeholder='Название' />
      <SCTextareaField name='shortDescription' placeholder='Краткое описание новости' />
      <ControlledEditor value={description} onChange={changeDescription} placeholder="Введите описание новости" />
      <div>
        <ImageInput value={news ? news.imageSrc : ''} onChange={uploadFile} allowClear={true} />
      </div>
      <Button onClick={cancel} variant='outline-secondary'>Отменить</Button>
      <Button type='submit' variant='primary' disabled={submitting || !hasChanges}>Сохранить</Button>
    </form>
  )
}


const NewsForm = ({onSubmit, initialValues, description, file, ...props}) => (
  <Form key={initialValues?.id || 'new'}
        onSubmit={values => onSubmit(values, {description, file})}
        initialValues={initialValues}
        render={formProps => <RenderForm {...formProps} {...props} description={description} file={file} />} />
)

export default NewsForm
