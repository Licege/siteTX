import React from 'react'
import { useContacts } from '../../redux/hooks/contacts.hooks';


interface ICallToAs {
    text: string
}

const CallToUs = ({ text }: ICallToAs) => {
  const contacts = useContacts()

  return <a href={`tel:${contacts.phone}`}>{text}</a>
}

export default CallToUs