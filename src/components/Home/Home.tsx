import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SectionMenu from './Menu/SectionMenu'
import SectionAbout from './About/SectionAbout'
import SectionPromo from './Promo/SectionPromo'
import SectionMap from './Map/SectionMap'
import { getNewsSelector } from '../../redux/selectors/news'
import { getCategoriesSelector, getDishesSelector } from '../../redux/selectors/menu'
import { getPromosSelector } from '../../redux/selectors/promos'
import { getContactsSelector } from '../../redux/selectors/contacts'
import { addDish } from '../../redux/reducers/bucket.reducer'
import { requestNews } from '../../redux/thunks/news.thunk'
import { requestDishes } from '../../redux/thunks/menu.thunk'
import { requestPromos } from '../../redux/thunks/promos.thunk'
import { requestContacts } from '../../redux/thunks/contacts.thunk'
import { dishType } from '../../types/types'

const Home: React.FC = () => {
    const news = useSelector(getNewsSelector)
    const menu = useSelector(getDishesSelector)
    const promos = useSelector(getPromosSelector)
    const contacts = useSelector(getContactsSelector)
    const categories = useSelector(getCategoriesSelector)

    const dispatch = useDispatch()

    const addDishToBucket = (dish: dishType) => {
        dispatch(addDish(dish))
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = 'Три Холма'
        dispatch(requestNews())
        dispatch(requestDishes())
        dispatch(requestPromos())
        dispatch(requestContacts())
    }, [ dispatch ])
    // let url = "http://navse360.ru/onlyTour/4421"
    return (
        <main className='Home'>
            <SectionAbout/>
            <SectionMenu menu={menu} categories={categories} addDishToBucket={addDishToBucket}/>
            <SectionPromo promos={promos}/>
            {/*<SectionDelivery contacts={contacts}/>*/}
            <SectionMap/>
        </main>
    )
}

export default Home
