import React from 'react'
import {Form} from 'react-final-form'
import VacancyForm from '../VacancyForm'
import {PageHeader} from '../../../styledComponents/components'
import {useCreateVacancyLogic} from './logic'


const CreateVacancy = () => {
  const {createVacancy, ...props} = useCreateVacancyLogic()

  return (
    <div>
      <PageHeader title='Создание вакансии' />
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <Form onSubmit={createVacancy}
                  render={({...formProps}) => <VacancyForm {...formProps} {...props} />}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateVacancy
