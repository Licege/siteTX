import React from 'react'
import InfoBlock from './InfoBlock'
import AddressBlock from './AddressBlock'
import NavigationBlock from './NavigationBlock'
import Copyright from './Copyright'

const Footer: React.FC = () => (
  <footer className='footer' id='footer'>
    <div className='footer__wrapper'>
        <InfoBlock />
        <AddressBlock />
        <NavigationBlock />
    </div>
    <Copyright />
  </footer>
)

export default Footer
