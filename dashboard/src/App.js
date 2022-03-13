import React from 'react'
import {useSelector} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header'
import NavigationSidebar from './components/NavigationSidebar'
import Modal from './components/Modals/ModalRoot'
import UsersContainer from './containers/Users/Users'
import Resume from './pages/Resume/Resume'
import UserContainer from './containers/Users/UserEdit'
import HomeContainer from './containers/Home/Home'
// import OrdersContainer from './containers/Orders/Orders'
// import MessagesContainer from './containers/Messages/Messages'
// import SettingsDelivery from './containers/Delivery/Settings/Settings'
// import SettingsDeliveryCommonNew from './containers/Delivery/Settings/SettingsCommonNew'
// import SettingsDeliveryCommonEdit from './containers/Delivery/Settings/SettingsCommonEdit'
import ReviewsContainer from './containers/Reviews/Reviews'
import HallsContainer from './containers/Halls/HallsContainer'
import AverageChecksContainer from './containers/Statistics/AverageChecksContainer'
import LeftoversContainer from './containers/Storage/LeftoversContainer'
import Feedback from './pages/Feedback'

import Admin from './pages/Admin/Admin'
import Auth from './pages/Auth/Auth'
import Contacts from './pages/Contacts/Contacts'
import Employees from './pages/Employees/all'
import CreateEmployee from './pages/Employees/create'
import Menu from './pages/Menu/main/Menu'
import CreateDish from './pages/Menu/CreateDish'
import EditDish from './pages/Menu/EditDish'
import News from './pages/News/main/News'
import CreateNews from './pages/News/CreateNews'
import EditNews from './pages/News/EditNews'
import Promos from './pages/Promos/main/Promos'
import CreatePromo from './pages/Promos/CreatePromo'
import ShowPromo from './pages/Promos/Promo'
import EditPromo from './pages/Promos/EditPromo'
import DeliveryInfo from './pages/Delivery/delivery-info'
import Delivery from './pages/Delivery/main/Delivery'
import SettingsDelivery from './pages/Delivery/Settings/Settings'
import SettingsDeliveryCommonNew from './pages/Delivery/Settings/Tabs/Common_Settings/create'
import SettingsDeliveryCommonEdit from './pages/Delivery/Settings/Tabs/Common_Settings/edit'
import Vacancies from './pages/Vacancies/all'
import CreateVacancy from './pages/Vacancies/new'
import EditVacancy from './pages/Vacancies/edit'
import Categories from './pages/Categories/all'
import CreateCategory from './pages/Categories/create'
import EditCategory from './pages/Categories/edit'
import MenuGallery from './pages/Menu/Gallery'

function App() {
  // const token = useSelector(state => state.auth.accessToken)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  // let isAuthenticated = !!token

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/login' component={Auth}/>
        <Redirect to='/login'/>
      </Switch>
    )
  }

  return (
    <div className='app-wrapper'>
      <Header/>
      <NavigationSidebar />
      <div className='app-wrapper-content'>
        <Switch>
          <Route exact path='/' component={HomeContainer}/>

          {/*Админ*/}
          <Route exact path='/admin' component={Admin}/>

          {/*Меню*/}
          <Route exact path='/menu' component={Menu}/>
          <Route exact path='/menu/new' component={CreateDish}/>
          <Route exact path='/menu/edit/:id' component={EditDish}/>
          <Route exact path='/categories' component={Categories}/>
          <Route exact path='/categories/new' component={CreateCategory}/>
          <Route exact path='/categories/edit/:id' component={EditCategory}/>

          {/*Слайды с меню*/}
          <Route exact path='/menu/slides' component={MenuGallery} />

          {/*Пользователи*/}
          <Route exact path='/users' component={UsersContainer}/>
          <Route exact path='/users/:id' component={UserContainer}/>

          {/*Сотрудники*/}
          <Route exact path='/employees' component={Employees}/>
          {/*<Route exact path='/employees/edit/:id' component={EmployeeContainer}/>*/}
          <Route exact path='/employees/new' component={CreateEmployee}/>

          {/*Резюме*/}
          <Route exact path='/resume' component={Resume}/>

          {/*Вакансии*/}
          <Route exact path='/vacancies' component={Vacancies}/>
          <Route exact path='/vacancies/edit/:id' component={EditVacancy}/>
          <Route exact path='/vacancies/new' component={CreateVacancy}/>

          {/*Новости*/}
          <Route exact path='/news' component={News}/>
          <Route exact path='/news/new' component={CreateNews}/>
          <Route exact path='/news/edit/:id' component={EditNews}/>

          {/*Доставка*/}
          <Route exact path='/delivery' component={Delivery}/>
          <Route exact path='/delivery/:id' component={DeliveryInfo}/>
          <Route exact path='/delivery-settings' component={SettingsDelivery}/>
          <Route exact path='/delivery-settings/new' component={SettingsDeliveryCommonNew}/>
          <Route exact path='/delivery-settings/edit/:id' component={SettingsDeliveryCommonEdit}/>

          {/*Акции*/}
          <Route exact path='/promos' component={Promos}/>
          <Route exact path='/promos/new' component={CreatePromo}/>
          <Route exact path='/promos/show/:id' component={ShowPromo}/>
          <Route exact path='/promos/edit/:id' component={EditPromo}/>

          {/*Отзывы*/}
          <Route exact path='/reviews' component={ReviewsContainer}/>

          {/*Банкетный зал*/}
          <Route exact path='/halls' component={HallsContainer}/>

          {/*Склад*/}
          <Route exact path='/leftovers' component={LeftoversContainer}/>

          {/*Статистика и отчеты*/}
          <Route exact path='/average_check' component={AverageChecksContainer}/>

          {/*<Route exact path='/messages' component={MessagesContainer}/>*/}
          <Route exact path='/contacts' component={Contacts}/>
          {/*<Route exact path='/orders' component={OrdersContainer}/>*/}

          <Route exact path='/feedback' component={Feedback} />

          <Redirect to='/'/>
        </Switch>
      </div>
      <Modal />
    </div>
  )
}

export default App
