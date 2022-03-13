import React from 'react'
import Button from 'react-bootstrap/Button'
import {PageHeader} from '../../../styledComponents/components'


const User = ({user, goEditMode, cancel}) => {
  if (!user) return null;

  return (
    <div>
      <PageHeader title={`Редактирование профиля: ${user.email}`} />
      <div className='page-container'>
        <div className='card'>
          <div className='card-body'>
            <div>Фамилия: {user.surname}</div>
            <div>Имя: {user.forename}</div>
            <div>E-mail: {user.email}</div>
            <div>Телефон: {user.phone}</div>
            <div>Бонусы: {user.bonusPoints || 0}</div>
            <Button variant='primary' onClick={goEditMode}>Изменить</Button>
            <Button variant='outline-secondary' onClick={cancel}>Назад</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
