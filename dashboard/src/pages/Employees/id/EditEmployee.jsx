import React from 'react'
import { Form } from 'react-final-form'
import { SCInputField, SCSelectField } from '../styledComponents'
import { prepareOptions } from '../../../components/Form'


const RenderForm = ({ handleSubmit, submitting, pristine, professions, cancel }) => (
  <form onSubmit={handleSubmit}>
      <SCInputField name='surname' placeholder='Фамилия' />
      <SCInputField name='name' placeholder='Имя' />
      <div>
          <label>Должность</label>
          <div>
              <SCSelectField name="profession"
                           options={prepareOptions(professions, { value: 'id', name: 'profession' })}
              />
          </div>
      </div>
      <SCInputField name='phone' placeholder='Телефон' />
      <SCInputField name='address' placeholder='Адрес' />
      <SCInputField name='file_id' placeholder='file_id' />
      <button type='submit' disabled={submitting || pristine}>Сохранить</button>
      <button type='button'
              onClick={cancel}
              disabled={submitting || pristine}
      >Отменить</button>
  </form>
)

const EditEmployee = ({ employee, onSubmit, ...props }) => {
    return (
        employee && <div>
            <div className='page-header'>
                <div className='page-header-title'>
                    Редактирование профиля: {employee.surname + ' ' + employee.name}
                </div>
            </div>
            <div className='page-container'>
                <div className='card'>
                    <div className='card-body'>
                        <Form onSubmit={onSubmit}
                              render={({ ...formProps }) => <RenderForm {...formProps} {...props} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployee
