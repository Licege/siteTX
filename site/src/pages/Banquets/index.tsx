import React, { useEffect } from 'react'
import styled from 'styled-components'

const Banquets = () => {
  useEffect(() => {
    document.title = 'Банкеты'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <Header>
          Ваши банкеты у нас
        {/*<div className="banquets-header__image">*/}
        {/*  <h3 className="banquets-header__title">Ваши банкеты у нас</h3>*/}
        {/*</div>*/}
      </Header>
    </main>
  )
}

const Header = styled.div`
  position: relative;
`

export default Banquets
