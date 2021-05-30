import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'

const AddressInfo = () => {
  const contacts = useContacts()

  if (!contacts) return null

  return (
    <>
      {contacts.address && <p>{contacts.address}</p>}
      {contacts.phone && <p><a href={`tel:${contacts.phone}`}>{contacts.phone}</a></p>}
      {contacts.openHours?.map((item, key) => <div key={key}>{item}</div>)}
    </>
  )
}

export default AddressInfo