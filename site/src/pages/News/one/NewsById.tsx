import React from 'react'
import { Button, PageContainer } from '../../../components/core'
import { useCurrentNewsPageLogic } from './logic'
import altImg from '../../../static/img/news.jpg'
import styled from 'styled-components'


const NewsById = () => {
  const {currentNews, redirectToAllNews} = useCurrentNewsPageLogic()
  const {title, description, imageSrc} = currentNews

  return (
    <PageContainer>
      <NewsContainer>
        <Image src={imageSrc || altImg} alt="" />
        <NewsWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <ActionsBlock>
            <Button variant="outlined" onClick={redirectToAllNews}>Все новости</Button>
          </ActionsBlock>
        </NewsWrapper>
      </NewsContainer>
    </PageContainer>
  )
}

const NewsContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 308px);
`

const Image = styled.img`
  width: 45%;
  height: 100%;
`

const NewsWrapper = styled.div`
  position: relative;
  padding-bottom: 40px;
  padding-left: 16px;
  width: 55%;
`

const Title = styled.h2`
  text-align: center;
`

const Description = styled.p`

`

const ActionsBlock = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

export default NewsById
