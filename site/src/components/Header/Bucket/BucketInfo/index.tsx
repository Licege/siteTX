import React from 'react'
import { useBucketInfoWrapperLogic } from '../logic'
import Content from './Content'
import Footer from './Footer'
import styled from 'styled-components'

interface IProps {
    isOpen: boolean
    toggle: () => void
}

const BucketInfo: React.FC<IProps> = ({ isOpen, toggle }) => {
    const { isBucketEmpty } = useBucketInfoWrapperLogic()

    return (
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

interface IWrapper {
    isShow: boolean
}

const Wrapper = styled.div<IWrapper>((props) => ({
    'min-width': '570px',
    'background-color': '#f9f9f9',
    position: 'absolute',
    top: '60px',
    right: 0,
    opacity: props.isShow ? 1 : 0,
    visibility: props.isShow ? 'visible' : 'hidden',
    padding: '24px',
    'border-radius': '5px',
    transition: '0.5s ease',
    'box-shadow': '0 8px 32px rgba(14, 14, 14, 0.16)'
}))

export default BucketInfo
