import React from 'react'
import {Button} from 'react-bootstrap'
import {Form} from 'react-final-form'
import {SCInputField, SCTextareaField} from './styledComponents'


const RenderForm = ({handleSubmit, submitting, pristine, cancel}) => (
  <form onSubmit={handleSubmit}>
    <SCInputField name='title' placeholder='Название' />
    <SCInputField name='capacity' placeholder='Вместимость' />
    <SCTextareaField name='description' placeholder='Описание' />
    <Button variant="primary" type="submit" disabled={submitting || pristine}>Сохранить</Button>
    <Button variant="secondary" type="button" onClick={cancel} disabled={submitting || pristine}>Отменить</Button>
  </form>
)

const FormHall = ({hall, ...props}) => (
  <>
    <div className="page-header">
      <div className="page-header-title">
        {hall ? hall.title : 'Добавление нового зала'}
      </div>
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <Form onSubmit={() => {}}
                  render={({...formProps}) => <RenderForm {...formProps} {...props} />}/>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default FormHall
