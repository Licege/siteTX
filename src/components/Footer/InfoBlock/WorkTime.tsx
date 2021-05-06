import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import hours from '../../../static/img/hours.svg'

const WorkTime = () => {
  const contacts = useContacts()

  return (
    <div className="footer__work_time">
      <span className="footer__title">
        <img className="footer__icon" src={hours} alt="" /> Часы работы</span>
        {contacts?.openHours?.map((item, key) => <div key={key}>{item}</div>)}
    </div>
  )
}

export default WorkTime