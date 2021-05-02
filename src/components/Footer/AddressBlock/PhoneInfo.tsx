import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import phone from '../../../static/img/phone.svg'

const PhoneInfo = () => {
  const contacts = useContacts()

  if (!contacts) return null

  return (
    <a className='footer__phone' href={`tel:${contacts.phone}`}>
      <img src={phone} alt=''/> {contacts.phone}
    </a>
  )
}

export default PhoneInfo