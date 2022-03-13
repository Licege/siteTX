import React, {useState} from 'react'
import EditEmployee from './EditEmployee'
import Employee from './Employee'


const ProfileEmployee = ( props ) => {
  let [ editMode, setEditMode ] = useState(false)

  return (
    <>
      {editMode ?
        <EditEmployee initialValues={props.employee}
                      employee={props.employee}
                      professions={props.professions}
                      onSubmit={props.onSubmit}
                      cancel={props.cancel}/>
        :
        <Employee employee={props.employee}
                  professions={props.professions}
                  goEditMode={() => { setEditMode(true)}}
                  cancel={props.cancel}/>
      }
    </>
  )
}

export default ProfileEmployee
