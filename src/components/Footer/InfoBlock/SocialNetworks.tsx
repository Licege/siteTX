import React from 'react'
import { useContacts } from '../../../redux/hooks/contacts.hooks'
import vk from '../../../static/img/vk.svg'
import instagram from '../../../static/img/instagram.svg'
import fb from '../../../static/img/fb.svg'
import tg from '../../../static/img/tg.svg'
import gmail from '../../../static/img/gmail.svg'
import tw from '../../../static/img/tw.svg'

const SocialNetworks = () => {
  const contacts = useContacts()

  if (!contacts) return null;

  return (
    <div className='footer__social'>
      {contacts.vk ?
        <a className='footer__social-link'
           href={contacts.vk}
           target='_blank'
           rel="noopener noreferrer"
        >
          <img src={vk} alt='vk'/>
        </a> : ''
      }
      {contacts.inst ?
        <a className='footer__social-link'
           href={contacts.inst}
           target='_blank'
           rel="noopener noreferrer"
        >
          <img src={instagram} alt='instagram'/>
        </a> : ''
      }
      {contacts.fb ?
        <a className='footer__social-link'
           href={contacts.fb}
           target='_blank'
           rel="noopener noreferrer"
        >
          <img src={fb} alt='facebook'/>
        </a> : ''
      }
      {contacts.tg ?
        <a className='footer__social-link'
           href={contacts.tg}
           target='_blank'
           rel="noopener noreferrer"
        >
          <img src={tg} alt='telegram'/>
        </a> : ''
      }
      {contacts.google ?
        <a className='footer__social-link'
           href={contacts.google}
           target='_blank'
           rel="noopener noreferrer"
        >
          <img src={gmail} alt='mail'/>
        </a> : ''
      }
      {contacts.tw ?
        <a className='footer__social-link'
           href={contacts.tw}
           target='_blank'
           rel="noopener noreferrer"
        >
          <img src={tw} alt='twitter'/>
        </a> : ''
      }
    </div>
  )
}

export default SocialNetworks;