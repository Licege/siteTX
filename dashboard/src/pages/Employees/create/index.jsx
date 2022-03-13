import React from 'react'
import EmployeeForm from '../Form'
import {useCreateEmployeePageLogic} from './logic';

const CreateProfile = () => {
  const {positions, cancel, create, uploadFile} = useCreateEmployeePageLogic();

  return (
    <div>
      <div className="page-header">
        <div className="page-header-title">
          Добавление нового сотрудника
        </div>
      </div>
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <EmployeeForm onSubmit={create} positions={positions} uploadFile={uploadFile} cancel={cancel} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile
