import React from 'react'
import {CardReview} from '../../../components/common/element/CardReview'

const WaitingReviews = ({reviews, onApprove, onDisapprove}) => (
  <div>
    {reviews.map(( review, key ) => <CardReview review={review}
                                                onApprove={onApprove}
                                                onDisapprove={onDisapprove}
                                                key={key}/>)}
  </div>
)

export default WaitingReviews
