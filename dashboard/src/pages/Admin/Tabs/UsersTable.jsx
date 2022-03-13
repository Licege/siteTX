import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {useSelector} from 'react-redux'

const CustomTable = ({children}) => (
  <div>
    <Table>
      <thead className="table-thread">
        <tr>
          <th>Email</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  </div>
)

const UserTable = () => {
  const admins = useSelector(state => state.usersPage.users);
  const users = useSelector(state => state.usersPage.users);

  const isAdmin = (id) => {
    return admins.findIndex(admin => admin.user_id._id === id)
  }

  return (
    <CustomTable>
      {users.map(user => (
        <tr key={user._id}>
          <td>{user.email}</td>
          <td>{isAdmin(user._id) === -1
            ? <Button variant="outline-primary" onClick={() => console.log('открыть модалку')}>+</Button>
            : <span>админ</span>}
          </td>
        </tr>
      ))}
    </CustomTable>
  )
}

export default UserTable
