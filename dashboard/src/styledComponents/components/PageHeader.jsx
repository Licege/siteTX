import React from 'react'
import styled from 'styled-components'
import {PageHeaderWrapper, Text} from '../atoms'

const Header = ({title, children}) => (
  <PageHeaderWrapper>
    <Title>{title}</Title>
    {Boolean(children) && <ButtonWrapper>{children}</ButtonWrapper>}
  </PageHeaderWrapper>
)

const Title = styled(Text)`
  margin: 0 30px;
  font-weight: bold;

  a, a:hover, a:focus, a:active, a:visited {
    color: inherit;
    text-decoration: inherit;
  }
`

const ButtonWrapper = styled.div`
  margin: 0 30px;
  display: flex;
  align-items: center;

  .btn-delete {
    margin-right: 100px;
  }
`

export default Header;