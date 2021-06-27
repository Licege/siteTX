import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import hours from '../../../static/img/hours.svg'
import { Schedule, Title } from '../styles'

const WorkTime = () => {
  const contacts = useContacts()

  return (
    <Schedule>
      <Title>
        <img src={hours} alt='' /> Часы работы
      </Title>
      {contacts?.openHours?.map((item, key) => <div key={key}>{item}</div>)}
    </Schedule>
  )
}

export default WorkTime