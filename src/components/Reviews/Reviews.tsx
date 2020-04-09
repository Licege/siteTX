import React from 'react'
import {IReview} from "../../types/types";
import {Button} from "@material-ui/core";
import ModalForm from "./ModalForm"

interface IProps {
    reviews: IReview[]
    isOpen: boolean
    toggleModal: () => void
    onSubmit: (data: IReview) => void
}

const Reviews: React.FC<IProps> = ( {isOpen, reviews, toggleModal, onSubmit} ) => {
    console.log(reviews)
    return (
        <div className='page-container'>
            <div className='page-container-title'>Отзывы</div>
            <div>
                <Button variant='contained' color='primary' onClick={toggleModal}>Оставить отзыв</Button>
            </div>
            <div>
                <ModalForm isOpen={isOpen} handleClose={toggleModal} onSubmit={onSubmit} />
            </div>
        </div>
    )
}

export default Reviews;