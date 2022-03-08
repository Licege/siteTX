import React, { Suspense, lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { isProduction } from '../../utils';
import MenuGallery from './MenuGallery';
import Loader from '../../components/core/Loader';

const SectionMenu = lazy(() => import('./Menu/SectionMenu'));
const SectionAbout = lazy(() => import('./About/SectionAbout'));
const SectionPromo = lazy(() => import('./Promo/SectionPromo'));
// const SectionMap = lazy(() => import('./Map/SectionMap'));
// const Tour = lazy(() => import('./Tour'));

const Content = () => (
  <Suspense fallback={<Loader />} >
    <SectionAbout/>
    <MenuGallery />
    {/*<Tour />*/}
    {!isProduction() && <SectionMenu/>}
    <SectionPromo />
    {/* <SectionDelivery contacts={contacts}/> */}
    {/*<SectionMap />*/}
  </Suspense>
)

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <Helmet title='Три Холма' />
      <Content />
    </main>
  )
}

export default Home
