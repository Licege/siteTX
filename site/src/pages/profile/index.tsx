import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components'
import { requestMe } from '../../redux/thunks/profile.thunks';
import { getMeSelector } from '../../redux/selectors/profile';
import ProfileInfo from './ProfileInfo';
import OrdersHistory from './OrdersHistory';
import './style.scss'

const setPageName = (name: string) => {
  document.title = name
}

const Profile = () => {
  const me = useSelector(getMeSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Профиль'

    dispatch(requestMe())
  }, [dispatch])

  useEffect(() => {
    const { surname, forename } = me

    if (surname && forename) {
      setPageName(`${surname} ${forename}`)
    }
  }, [me])

  if (!me || !Object.keys(me).length) return null

  return (
    <Container>
      <Tabs defaultActiveKey='profile' id='profile-page-tab'>
        <Tab eventKey='profile' title='Профиль'>
          {/* <FormEditProfile onSubmit={() => {}} /> */}
          <ProfileInfo profile={me} />
        </Tab>
        <Tab eventKey='order-history' title='История заказов'>
          <OrdersHistory />
        </Tab>
        <Tab eventKey='order-bonus' title='Бонусы'>
          <div>2</div>
        </Tab>
      </Tabs>
    </Container>
  )
}

const Container = styled.main`
    height: 100%;
    width: calc(100% - 48px);
    background-color: ${props => props.theme.colors.white};
    margin: 24px;
    box-shadow: ${props => props.theme.colors.borderShadow};
`

export default Profile