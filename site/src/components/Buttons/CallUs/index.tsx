import React from 'react'
import styled from 'styled-components';
import { useContacts } from '../../../redux/hooks/contacts.hooks';

const ButtonCallToUs = () => {
  const contacts = useContacts()

  return (
    <Wrapper href={`tel:${contacts.phone}`} aria-label="Call with us">
      <i className='fas fa-phone-alt' />
    </Wrapper>
  )
}

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  font-size: 24px;
  transform: rotate(245deg);
  color: yellow;
  background-color: green;
  
  &:hover {
    color: yellow;
    background-color: green;
    text-decoration: none;
  }
`

export default ButtonCallToUs