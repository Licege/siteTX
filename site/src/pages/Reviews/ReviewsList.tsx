import React from 'react'
import { IReview } from '../../types/types'

interface IProps {
    reviews: IReview[]
}


const ReviewsList: React.FC<IProps> = ({ reviews }) => (
  reviews ?
    <div>
      {reviews.map((review, key) => (
        <div key={key}>{review.surname}</div>
            ))}
    </div> : null
)

export default ReviewsList
