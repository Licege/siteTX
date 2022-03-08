import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import vk from '../../../static/img/vk.svg'
import instagram from '../../../static/img/instagram.svg'
import fb from '../../../static/img/fb.svg'
import tg from '../../../static/img/tg.svg'
import gmail from '../../../static/img/gmail.svg'
import tw from '../../../static/img/tw.svg'
import { SocialNav } from '../styles'

const ICON_WIDTH = 24;
const ICON_HEIGHT = 24;

const SocialNetworks = () => {
  const contacts = useContacts()

  if (!contacts) return null;

  return (
    <SocialNav>
      {contacts.vk ?
        <a href={contacts.vk}
           target='_blank'
           rel="noopener noreferrer">
          <img src={vk} height={ICON_HEIGHT} width={ICON_WIDTH} alt='vk'/>
        </a> : ''
      }
      {contacts.inst ?
        <a href={contacts.inst}
           target='_blank'
           rel="noopener noreferrer">
          <img src={instagram} height={ICON_HEIGHT} width={ICON_WIDTH} alt='instagram'/>
        </a> : ''
      }
      {contacts.fb ?
        <a href={contacts.fb}
           target='_blank'
           rel="noopener noreferrer">
          <img src={fb} height={ICON_HEIGHT} width={ICON_WIDTH} alt='facebook'/>
        </a> : ''
      }
      {contacts.tg ?
        <a href={contacts.tg}
           target='_blank'
           rel="noopener noreferrer">
          <img src={tg} height={ICON_HEIGHT} width={ICON_WIDTH} alt='telegram'/>
        </a> : ''
      }
      {contacts.google ?
        <a href={contacts.google}
           target='_blank'
           rel="noopener noreferrer">
          <img src={gmail} height={ICON_HEIGHT} width={ICON_WIDTH} alt='mail'/>
        </a> : ''
      }
      {contacts.tw ?
        <a href={contacts.tw}
           target='_blank'
           rel="noopener noreferrer">
          <img src={tw} height={ICON_HEIGHT} width={ICON_WIDTH} alt='twitter'/>
        </a> : ''
      }
    </SocialNav>
  )
}

export default SocialNetworks;