import React from 'react'
import {Button} from 'react-bootstrap'
import {SCInputField, SCTextareaField} from './styledComponents'
import ImageInput from '../../components/common/imageInput'
import ControlledEditor from '../../components/common/element/editor/ControlledEditor';

const VacancyForm = ({handleSubmit, submitting, pristine, vacancy, imageSrc = '', setDescription, uploadFile, cancel}) => (
  <form onSubmit={handleSubmit}>
    <SCInputField name='title' placeholder='Название' />
    <SCInputField name='salaryFrom' placeholder='Зп от' parse={value => Number(value)} />
    <SCInputField name='salaryTo' placeholder='Зп до' parse={value => Number(value)} />
    <SCTextareaField name='shortDescription' placeholder='Краткое описание вакансии' />
    <ControlledEditor value={vacancy?.description || ''} onChange={setDescription} placeholder='Описание вакансии' />
    <div>
      <ImageInput value={imageSrc} onChange={uploadFile} allowClear={true} />
    </div>
    <Button variant="primary" type="submit" disabled={submitting || pristine}>Сохранить</Button>
    <Button variant="secondary" type="button" disabled={submitting} onClick={cancel}>Отменить</Button>
  </form>
)

export default VacancyForm