import React from 'react'
import {Button} from 'react-bootstrap'
import {SCInputField} from './styledComponents'
import ImageInput from '../../components/common/imageInput'

const VacancyForm = ({ handleSubmit, submitting, pristine, imageSrc = '', uploadFile, cancel }) => (
  <form onSubmit={handleSubmit}>
    <SCInputField name='title' placeholder='Название' />
    <SCInputField name='requirements' placeholder='Требования' />
    <SCInputField name='description' placeholder='Описание' />
    <SCInputField name='salary_from' placeholder='Зп от' parse={value => Number(value)} />
    <SCInputField name='salary_to' placeholder='Зп до' parse={value => Number(value)} />
    <div>
      <ImageInput value={imageSrc} onChange={uploadFile} allowClear={true} />
    </div>
    <Button variant="primary" type="submit" disabled={submitting || pristine}>Сохранить</Button>
    <Button variant="secondary" type="button" disabled={submitting} onClick={cancel}>Отменить</Button>
  </form>
)

export default VacancyForm