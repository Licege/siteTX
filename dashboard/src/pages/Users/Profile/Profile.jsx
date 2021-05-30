import React, { useState } from 'react'
import UserEditForm from '../id/UserEditForm'
import User from '../id/User'

const Profile = (props) => {
  let [editMode, setEditMode] = useState(false)

  if (!props) {
    console.log('Прелоадер в Profile')
  }

  const onSubmit = (formData) => {
    let data = {...formData}
    data.bonus_points = parseInt(data.bonus_points, 10)
    props.updateProfile(data).then(
      () => {
        setEditMode(false)
      }
    )
  }

  return (
    <>
      {editMode
        ? <UserEditForm initialValues={props.user} profile={props.user} cancel={props.cancel} onSubmit={onSubmit} />
        : <User user={props.user} cancel={props.cancel} goEditMode={() => {setEditMode(true)}} />
      }
    </>
  )
}

export default Profile