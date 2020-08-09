import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import ModalForm from './ModalForm'
import { getReviewsSelector } from '../../redux/selectors/reviews'
import { getAuthStatus } from '../../redux/selectors/auth'
import { postReview, requestReviews } from '../../redux/reviews-reducer'
import { IReview } from '../../types/types'


const Reviews: React.FC = () => {
    let [isOpen, setIsOpen] = useState(false)
    let reviews = useSelector(getReviewsSelector)
    let isAuthenticated = useSelector(getAuthStatus)
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
        let post = {
            ...data,
            create_at: Date.parse(new Date().toString()),
            status: 0,
        }
        dispatch(postReview(post))
    }

    return (
        <main className='reviews page-container'>
            <h1 className='page-container-title'>~ Отзывы ~</h1>
            {reviews.length
                ? <div className='reviews-empty'>
                    К сожалению, здесь пока нет ни одного отзыва, но Вы можете стать первым, кто оставит его :)
                </div>
                : <div className='reviews-empty'>Отзывы еще не готовы :)</div>
            }
            <div className='reviews__action'>
                <Button variant='contained' color='primary' onClick={toggleModal} disabled={!isAuthenticated}>Оставить
                    отзыв</Button>
                {!isAuthenticated && <span className='reviews__hint'>Авторизуйтесь, чтобы оставить отзыв.</span>}
            </div>
            <div>
                <ModalForm isOpen={isOpen} handleClose={toggleModal} onSubmit={onSubmit}/>
            </div>
        </main>
    )
}

export default Reviews
