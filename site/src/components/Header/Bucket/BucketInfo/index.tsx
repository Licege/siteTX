import React from 'react'
import styled from 'styled-components'
import { useBucketInfoWrapperLogic } from '../logic'
import Content from './Content'
import Footer from './Footer'
import { BREAKPOINTS } from '../../../../styledComponents/helpers';

interface IProps {
    isOpen: boolean
    toggle: () => void
}

const BucketInfo: React.FC<IProps> = ({ isOpen, toggle }) => {
  const { isBucketEmpty } = useBucketInfoWrapperLogic()

  return (
  /* @ts-ignore */
    <Wrapper isShow={isOpen}>
      {isBucketEmpty
                ? (
                  <>
                    <Content />
                    <Footer toggle={toggle} />
                  </>
              )
                : <div>
                  К сожалению в корзине ничего нет.
                </div>
            }
    </Wrapper>
  )
}

const Wrapper = styled.div`
    min-width: 570px;
    background-color: #f9f9f9;
    position: absolute;
    top: 60px;
    right: 0;
    opacity: ${(props: any) => props.isShow ? 1 : 0};
    visibility: ${(props: any) => props.isShow ? 'visible' : 'hidden'};
    padding: 24px;
    border-radius: 5px;
    transition: 0.3s ease;
    box-shadow: 0 8px 32px rgba(14, 14, 14, 0.16);

  @media(max-width: ${BREAKPOINTS.ml}px) {
    min-width: 320px;
    padding: 16px;
  }

  @media(max-width: ${BREAKPOINTS.ms}px) {
    padding: 8px;
  }
`

export default BucketInfo
