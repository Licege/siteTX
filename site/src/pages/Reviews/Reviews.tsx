import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ModalForm from './ModalForm'
import { getReviewsSelector } from '../../redux/selectors/reviews'
import { getAuthStatus } from '../../redux/selectors/auth'
import { postReview, requestReviews } from '../../redux/thunks/reviews.thunk'
import { IReview } from '../../types/types'
import { Button, PageContainer, PageTitle } from '../../components/core'
import { ActionsBlock, EmptyPage, Hint } from './styles'


const Reviews: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const reviews = useSelector(getReviewsSelector)
  const isAuthenticated = useSelector(getAuthStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'Отзывы'
    window.scrollTo(0, 0)
  })

  useEffect(() => {
    dispatch(requestReviews())
  }, [dispatch])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const onSubmit = ( data: IReview ) => {
    const post = {
      ...data,
      create_at: Date.parse(new Date().toString()),
      status: 0,
    }
    dispatch(postReview(post))
  }

  return (
    <PageContainer>
      <PageTitle>~ Отзывы ~</PageTitle>
      {reviews.length
                ? <EmptyPage>
                  К сожалению, здесь пока нет ни одного отзыва, но Вы можете стать первым, кто оставит его :)
                </EmptyPage>
                : <EmptyPage>Отзывы еще не готовы :)</EmptyPage>
            }
      <ActionsBlock>
        <Button variant='contained' color='primary' onClick={toggleModal} disabled={!isAuthenticated}>
          Оставить отзыв
        </Button>
        {!isAuthenticated && <Hint>Авторизуйтесь, чтобы оставить отзыв.</Hint>}
      </ActionsBlock>
      <div>
        <ModalForm isOpen={isOpen} handleClose={toggleModal} onSubmit={onSubmit}/>
      </div>
    </PageContainer>
  )
}

export default Reviews
