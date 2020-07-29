import React from 'react'
import { IReview } from '../../types/types'
import { Button } from '@material-ui/core'
import ModalForm from './ModalForm'

interface IProps {
    reviews: IReview[]
    isAuthenticated: boolean
    isOpen: boolean
    toggleModal: () => void
    onSubmit: ( data: IReview ) => void
}

const Reviews: React.FC<IProps> = ( {isAuthenticated, isOpen, reviews, toggleModal, onSubmit} ) => {
    return (
        <main className='page-container'>
            <h4 className='page-container-title'>~ Отзывы ~</h4>
            <div>
                <Button variant='contained' color='primary' onClick={toggleModal} disabled={!isAuthenticated}>Оставить
                    отзыв</Button>
                {!isAuthenticated && <span>Авторизуйтесь, чтобы оставить отзыв.</span>}
            </div>
            <div>
                <ModalForm isOpen={isOpen} handleClose={toggleModal} onSubmit={onSubmit}/>
            </div>
        </main>
    )
}

export default Reviews
