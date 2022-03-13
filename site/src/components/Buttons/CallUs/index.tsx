import React from 'react'
import styled from 'styled-components';
import { useContacts } from '../../../redux/hooks/contacts.hooks';

// const BOX_SHADOW_COLOR = [56, 163, 253];
// const BOX_SHADOW_COLOR = [100, 28, 21];

const ButtonCallToUs = () => {
  const contacts = useContacts()

  return (
    <Wrapper href={`tel:${contacts.phone}`} aria-label="Call with us">
      <i className='fas fa-phone-alt' />
    </Wrapper>
  )
}

// const Wrapper = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 50px;
//   height: 50px;
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   border-radius: 50%;
//   font-size: 24px;
//   transform: rotate(245deg);
//   color: yellow;
//   background-color: green;
//
//   &:hover {
//     color: yellow;
//     background-color: green;
//     text-decoration: none;
//   }
// `

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  //background: #38a3fd;
  color: yellow;
  background-color: green;
  border: 2px solid #38a3fd;
  border-radius: 50%;
  box-shadow: 0 8px 10px rgba(56,163,253,0.3);
  cursor: pointer;
  height: 50px;
  text-align: center;
  width: 50px;
  position: fixed;
  right: 3%;
  bottom: 5%;
  z-index: 999;
  transition: .3s;
  -webkit-animation: hoverWave linear 1s infinite;
  animation: hoverWave linear 1s infinite;
  
  i {
    transform: translateY(-1px);
  }
  
  &:hover {
    color: yellow;
    background-color: green;
    text-decoration: none;
  }

  @-webkit-keyframes hoverWave {
    0% {
      box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 0 rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
    }
    40% {
      box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 15px rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
    }
    80% {
      box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 26.7px rgba(56,163,253,0.067)
    }
    100% {
      box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 40px rgba(56,163,253,0.0)
    }
  }
  
  @keyframes hoverWave {
     0% {
       box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 0 rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
     }
     40% {
       box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 15px rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
     }
     80% {
       box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 26.7px rgba(56,163,253,0.067)
     }
     100% {
       box-shadow: 0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 40px rgba(56,163,253,0.0)
     }
   }
`

export default ButtonCallToUs