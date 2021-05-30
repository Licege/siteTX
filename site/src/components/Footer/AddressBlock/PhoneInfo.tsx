import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import phone from '../../../static/img/phone.svg'
import { Phone } from '../styles'

const PhoneInfo = () => {
  const contacts = useContacts()

  if (!contacts) return null

  return (
    <Phone href={`tel:${contacts.phone}`}>
      <img src={phone} alt=''/> {contacts.phone}
    </Phone>
  )
}

export default PhoneInfo