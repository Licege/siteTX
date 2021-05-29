import React from 'react'
import { CardReview } from '../../../components/common/element/CardReview'

const ApprovedReviews = ({ reviews, onDisapprove }) => (
    <div>
        {reviews.map(( review, key ) => <CardReview review={review} onDisapprove={onDisapprove} key={key}/>)}
    </div>
)

export default ApprovedReviews
