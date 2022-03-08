import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { isProduction } from './utils';
import Loader from './components/core/Loader';

const Profile = lazy(() => import('./pages/Profile'));
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Vacancies = lazy(() => import('./pages/Vacancies/all'));
const VacancyById = lazy(() => import('./pages/Vacancies/one'));
const Resume = lazy(() => import('./pages/Vacancies/Resume'));
const Order = lazy(() => import('./pages/Order'));
const News = lazy(() => import('./pages/News/all'));
const NewsById = lazy(() => import('./pages/News/one'));
const Bucket = lazy(() => import('./pages/Bucket'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Banquets = lazy(() => import('./pages/Banquets'));
const Promos = lazy(() => import('./pages/Promos/all'));
const Promo = lazy(() => import('./pages/Promos/one'));
const Complain = lazy(() => import('./pages/Complain'));
const Error404 = lazy(() => import('./pages/Errors/Error404'));
const Gallery = lazy(() => import('./components/Gallery'));


const Routes = () => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {!isProduction() && <Route exact path="/me" component={Profile} />}
      <Route exact path='/' component={Home} />
      {!isProduction() && <Route path="/menu/:categoryId?" component={Menu} />}
      <Route exact path='/contacts' component={Contacts}/>
      <Route exact path='/vacancies' component={Vacancies}/>
      <Route exact path='/vacancies/:id' component={VacancyById}/>
      {!isProduction() && <Route exact path="/gallery" component={Gallery}/>}
      {!isProduction() && <Route exact path="/order" component={Order}/>}
      <Route exact path='/news' component={News}/>
      <Route exact path='/news/:id' component={NewsById}/>
      {!isProduction() && <Route exact path="/bucket" component={Bucket}/>}
      {!isProduction() && <Route exact path="/reviews" component={Reviews}/>}
      {!isProduction() && <Route exact path="/resume/:id" component={Resume}/>}
      {!isProduction() && <Route exact path="/banquets" component={Banquets}/>}
      <Route exact path='/actions' component={Promos}/>
      <Route exact path='/actions/:id' component={Promo}/>
      <Route exact path='/complain' component={Complain} />
      <Route component={Error404}/>
    </Switch>
  </Suspense>
)

export default Routes