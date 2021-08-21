import React from 'react'
import { Form } from 'react-final-form'
import VacancyForm from '../VacancyForm'
import {PageHeader} from '../../../styledComponents/components'
import {useEditVacancyLogic} from './logic'


const EditVacancy = () => {
  const { vacancy, setDescription, editVacancy, uploadFile, cancel } = useEditVacancyLogic()

  if (!vacancy) return <div />

  const { title, imageSrc } = vacancy

  const pageTitle = `Редактирование вакансии: ${title}`
  const props = { vacancy, setDescription, uploadFile, cancel, imageSrc }

  return (
    <div>
      <PageHeader title={pageTitle} />
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <Form onSubmit={editVacancy}
                  initialValues={vacancy}
                  render={({ ...formProps }) => <VacancyForm {...formProps} {...props} />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditVacancy
