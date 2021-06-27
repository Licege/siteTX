import React from 'react'
import altAvatar from '../../../../static/img/female_cook.png'
import './style.scss'

interface IProps {
    avatarSrc: string | undefined
}

export const Avatar = ({ avatarSrc = '' }: IProps) => (
  <img className='avatar' src={avatarSrc || altAvatar} alt='Аватар' />
)