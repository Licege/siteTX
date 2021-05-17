import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import address from '../../../static/img/address.svg'
import { Title, Address } from '../styles'

const AddressInfo = () => {
  const contacts = useContacts()

  if (!contacts) return null

  return (
    <>
      <Title>Адрес</Title>
      <Address>
        <a
          href='https://yandex.ru/maps/22/kaliningrad/?from=api-maps&ll=20.366668%2C54.649906&mode=routes&origin=jsapi_2_1_76&rtext=~54.649946%2C20.366788&rtt=auto&ruri=~&z=17'
          target='_blank'
          rel="noopener noreferrer"
        >
          <img src={address} alt=''/>{contacts.address}
        </a>
      </Address>
    </>
  )
}

export default AddressInfo