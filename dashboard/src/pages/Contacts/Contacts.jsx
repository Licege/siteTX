import React from 'react'
import {PageHeader} from '../../styledComponents/components'
import FormContacts from './FormContacts'
import {useContactLogic} from './logic'


const Contact = () => {
  const {contacts, updateContacts, ...props} = useContactLogic()

  if (!contacts) return null

  return (
    <div>
      <PageHeader title='Контакты' />
      <div className="page-container">
        <div className="card">
          <div className="card-body">
            <FormContacts onSubmit={updateContacts} initialValues={contacts} {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
