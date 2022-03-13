import React from 'react'
import {Figure, useAccordionToggle} from 'react-bootstrap'
import arrowDown from '../../../static/img/menu-arrow-down.png'
import arrowUp from '../../../static/img/menu-arrow-up.png'
import {useDispatch, useSelector} from 'react-redux'

const CustomToggle = ( {children, eventKey} ) => {
  const dispatch = useDispatch()
  const active = useSelector(state => state.toggleComponent.active)

  const changeArrow = useAccordionToggle(eventKey, () =>
    active === eventKey ? dispatch({type: 'TOGGLE', active: null}) : dispatch({
      type: 'TOGGLE',
      active: eventKey,
    }),
  )

  return (
    <Figure className='navbar-accordion-header'
            variant="link"
            eventkey={eventKey}
            onClick={changeArrow}>
      {children}
      {active === eventKey
                ? <img className='navbar-accordion-header-arrow' src={arrowUp} alt=""/>
                : <img className='navbar-accordion-header-arrow' src={arrowDown} alt=""/>}
    </Figure>
  )
}

export default CustomToggle
