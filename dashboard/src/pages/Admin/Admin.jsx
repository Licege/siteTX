import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import AdminsTable from './Tabs/AdminsTable'
import UserTable from './Tabs/UsersTable'
import { PageHeader } from '../../styledComponents/components'

const Admin = () => {
  return (
    <div>
      <PageHeader title='Администраторы' />
      <div className="page-container">
        <Tab.Container id="admin-container-tabs" defaultActiveKey="admins-tab">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="admins-tab">Администраторы</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users-tab">Пользователи</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="admins-tab">
              <AdminsTable />
            </Tab.Pane>
            <Tab.Pane eventKey="users-tab">
              <UserTable />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  )
}

export default Admin
