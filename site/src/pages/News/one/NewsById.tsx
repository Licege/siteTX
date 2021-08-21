import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet';
import { Button, PageContainer } from '../../../components/core'
import { useCurrentNewsPageLogic } from './logic'
import altImg from '../../../static/img/news.jpg'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import { TextHtml } from '../../../styledComponents/components';


const NewsById = () => {
  const { currentNews, redirectToAllNews } = useCurrentNewsPageLogic()
  const { title, description, imageSrc } = currentNews

  return (
    <PageContainer>
      <Helmet title={currentNews.title} />
      <NewsContainer>
        <Image src={imageSrc || altImg} alt="" />
        <NewsWrapper>
          <Title>{title}</Title>
          <TextHtml dangerouslySetInnerHTML={{ __html: description }} />
          <ActionsBlock>
            <Button variant="outlined" onClick={redirectToAllNews}>Все новости</Button>
          </ActionsBlock>
        </NewsWrapper>
      </NewsContainer>
    </PageContainer>
  )
}

const NewsContainer = styled.div`
  &:after {
    content: " ";
    display: table;
    clear: both;
  }
`

const Image = styled.img`
  float: left;
  width: 45%;
  height: 100%;
  margin: 0 16px 8px 36px;
  border-radius: 5px;

  @media (max-width: ${BREAKPOINTS.ts}px) {
    margin: 0 0 16px;
    width: 100%;
  }
`

const NewsWrapper = styled.div`
  position: relative;
  padding-bottom: 40px;
  padding-left: 36px;

  @media(max-width: ${BREAKPOINTS.ts}px) {
    padding: 0;
  }
`

const Title = styled.h2`
  text-align: center;
`

const ActionsBlock = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`

export default NewsById
