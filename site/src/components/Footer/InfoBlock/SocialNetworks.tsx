import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import vk from '../../../static/img/vk.svg'
import instagram from '../../../static/img/instagram.svg'
import fb from '../../../static/img/fb.svg'
import tg from '../../../static/img/tg.svg'
import gmail from '../../../static/img/gmail.svg'
import tw from '../../../static/img/tw.svg'
import { SocialNav } from '../styles'

const SocialNetworks = () => {
  const contacts = useContacts()

  if (!contacts) return null;

  return (
    <SocialNav>
      {contacts.vk ?
        <a href={contacts.vk}
           target='_blank'
           rel="noopener noreferrer">
          <img src={vk} alt='vk'/>
        </a> : ''
      }
      {contacts.inst ?
        <a href={contacts.inst}
           target='_blank'
           rel="noopener noreferrer">
          <img src={instagram} alt='instagram'/>
        </a> : ''
      }
      {contacts.fb ?
        <a href={contacts.fb}
           target='_blank'
           rel="noopener noreferrer">
          <img src={fb} alt='facebook'/>
        </a> : ''
      }
      {contacts.tg ?
        <a href={contacts.tg}
           target='_blank'
           rel="noopener noreferrer">
          <img src={tg} alt='telegram'/>
        </a> : ''
      }
      {contacts.google ?
        <a href={contacts.google}
           target='_blank'
           rel="noopener noreferrer">
          <img src={gmail} alt='mail'/>
        </a> : ''
      }
      {contacts.tw ?
        <a href={contacts.tw}
           target='_blank'
           rel="noopener noreferrer">
          <img src={tw} alt='twitter'/>
        </a> : ''
      }
    </SocialNav>
  )
}

export default SocialNetworks;