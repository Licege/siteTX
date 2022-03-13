import React from 'react'
import {Nav, Tab} from 'react-bootstrap'
import GlobalSettingsForm from './Tabs/Global_Settings/GlobalSettingsForm'
import SettingsTable from './Tabs/Common_Settings/SettingsTable'
import Header from './Header'


const Settings = () => (
  <div>
    <Header />
    <div className='page-container'>
      <Tab.Container id='page-delivery-settings-tab' defaultActiveKey='settings'>
        <Nav variant='pills'>
          <Nav.Item>
            <Nav.Link eventKey='settings'>Настройки</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='global-settings'>Общие</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey='settings'>
            <SettingsTable />
          </Tab.Pane>
          <Tab.Pane eventKey='global-settings'>
            <GlobalSettingsForm />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  </div>
)

export default Settings
