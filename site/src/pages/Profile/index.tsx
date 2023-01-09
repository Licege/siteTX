import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import styled from 'styled-components'
import { useOnlyAuth } from '@/hooks/useOnlyAuth';
import { requestMe } from '@/redux/thunks/profile.thunks';
import { getMeSelector } from '@/redux/selectors/profile';
import ProfileInfo from './ProfileInfo';
import OrdersHistory from './OrdersHistory';
import './style.scss'

const Profile = () => {
  useOnlyAuth();
  const me = useSelector(getMeSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Профиль'

    dispatch(requestMe())
  }, [dispatch])

  if (!me || !Object.keys(me).length) return null

  return (
    <Container>
      <Helmet title={`${me.surname} ${me.forename}`} />
      <Tabs defaultActiveKey='profile' id='profile-page-tab'>
        <Tab eventKey='profile' title='Профиль'>
          {/* <FormEditProfile onSubmit={() => {}} /> */}
          <ProfileInfo profile={me} />
        </Tab>
        <Tab eventKey='order-history' title='История заказов'>
          <OrdersHistory />
        </Tab>
        <Tab eventKey='order-bonus' title='Бонусы'>
          <div>В разработке...</div>
        </Tab>
      </Tabs>
    </Container>
  )
}

const Container = styled.main`
    height: calc(100% - 60px);
    width: calc(100% - 48px);
    background-color: ${props => props.theme.colors.white};
    margin: 24px;
    box-shadow: ${props => props.theme.colors.borderShadow};
`

export default Profile