import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const CustomTable = ({ children }) => {
    return (
      <div>
          <Table>
              <thead className="table-thread">
              <tr>
                  <th>Email</th>
                  <th>ФИО</th>
                  <th>Телефон</th>
              </tr>
              </thead>
              <tbody className="table-body">
              {children}
              </tbody>
          </Table>
      </div>
    )
}

const AdminsTable = () => {
    const admins = useSelector(state => state.usersPage.users);

    return (
      <CustomTable>
          {admins ? admins.map(admin =>
            <tr key={admin._id}>
                <td>{admin.user_id.email}</td>
                <td>В разработке</td>
                <td>В разработке</td>
            </tr>) : null}
      </CustomTable>
    )
}

export default AdminsTable
