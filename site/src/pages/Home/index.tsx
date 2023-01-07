import React, { Suspense, lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Loader from '@/components/core/Loader';
import { isProduction } from '@/utils';
import MenuGallery from './components/sections/MenuGallery/MenuGallery';

const SectionMenu = lazy(() => import('./components/sections/Menu/SectionMenu'));
const SectionAbout = lazy(() => import('./components/sections/About/SectionAbout'));
const SectionPromo = lazy(() => import('./components/sections/Promo/SectionPromo'));
// const SectionDelivery = lazy(() => import('./components/sections/Delivery/SectionDelivery'));
// const SectionMap = lazy(() => import('./components/sections/Map/SectionMap'));
// const Tour = lazy(() => import('./components/sections/Tour/Tour'));

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
