import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import CardNews from '../../../components/Cards/CardNews'
import Paginator from '../../../components/common/elements/Paginator'
import EmptyPage from '../../empyPage'
import { PageContainer, PageTitle } from '../../../components/core'
import { useNewsPageLogic } from './logic'


const News = () => {
  const { news, totalCount, onPageChange } = useNewsPageLogic()

  if (!news.length) return <EmptyPage />

  return (
    <Container>
      <div>
        <PageTitle>~ Новости ~</PageTitle>
        <TransitionGroup component={null}>
          {news.map(item =>
            <AnimationWrapper timeout={2000} key={item.id} mountOnEnter unmountOnExit>
              <CardNews news={item} key={item.id} />
            </AnimationWrapper>
          )}
        </TransitionGroup>
      </div>

      {news && <Paginator totalItemsCount={totalCount} onChange={onPageChange} />}
    </Container>
  )
}

const Container = styled(PageContainer).attrs(() => ({ as: 'main' }))`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AnimationWrapper = styled(CSSTransition)`
  &-enter {
    opacity: 0;

    &-active {
      opacity: 1;
      transition: opacity 2s;
    }
  }

  &-exit {
    opacity: 1;

    &-active {
      opacity: 0;
      transition: opacity 2s;
    }
  }
`

export default News
