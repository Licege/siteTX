import React from 'react'
import {Table} from 'react-bootstrap'
import deleteButton from '../../static/img/close.png'
import {tsToDate} from '../../plugins/helpers'
import {PageHeader} from '../../styledComponents/components'

const Messages = ({messages, deleteMessage}) => {
  return (
    <div>
      <PageHeader title='Сообщения' />
      <div className="page-container">
        <div className="card">
          {messages && messages.length ? <Table responsive>
            <thead className="table-thread">
              <tr>
                <th>Создано</th>
                <th>Пользователь</th>
                <th>Телефон</th>
                <th>E-mail</th>
                <th>Сообщение</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(message => (
                <tr key={message.id}>
                  <td>{tsToDate(message.create_at, 'hh:mm dd:MM:YYYY')}</td>
                  <td>{message.name}</td>
                  <td>{message.phone}</td>
                  <td>{message.email}</td>
                  <td>{message.content}</td>
                  <td>
                    <button onClick={(e) => deleteMessage(message.id)}>
                      <img src={deleteButton} alt="Удалить" />
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </Table> : ''}
        </div>
      </div>
    </div>
  )
}


export default Messages
