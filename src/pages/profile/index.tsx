import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { requestMe } from '../../redux/profile-reducer';
import { getMeSelector } from '../../redux/selectors/profile';
import { ProfileInfo } from './ProfileInfo';
import { Tab, Tabs } from 'react-bootstrap';
import { OrdersHistory } from './OrdersHistory';
import './style.scss'

const setPageName = (name: string) => document.title = name

const Profile = () => {
    const me = useSelector(getMeSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Профиль'

        dispatch(requestMe())
    }, [])

    useEffect(() => {
        const { surname, forename } = me

        if (surname && forename) {
            setPageName(`${surname} ${forename}`)
        }
    }, [me])

    if (!me || !Object.keys(me).length) return null

    return (
        <main className='profile'>
            <Tabs defaultActiveKey='profile' id='profile-page-tab'>
                <Tab eventKey='profile' title='Профиль'>
                    {/*<FormEditProfile onSubmit={() => {}} />*/}
                    <ProfileInfo profile={me} />
                </Tab>
                <Tab eventKey='order-history' title='История заказов'>
                    <OrdersHistory />
                </Tab>
                <Tab eventKey='order-bonus' title='Бонусы'>
                    <div>2</div>
                </Tab>
            </Tabs>
        </main>
    )
}

export default Profile