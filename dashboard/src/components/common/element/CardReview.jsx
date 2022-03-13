import React from 'react'
import Button from 'react-bootstrap/Button'
import {Rating} from './Rating'

export const CardReview = ( {review, onApprove, onDisapprove} ) => {
  return (
    <div className='card'>
      <div>
        <div>{review.description}</div>
        <Rating value={review.rating} size={20} disabled={true}/>
      </div>
      <div>
        {onDisapprove ?
          <Button variant='outline-danger' onClick={onDisapprove(review)}>Отклонить</Button> : null}
        {onApprove ? <Button variant='primary' onClick={onApprove(review)}>Одобрить</Button> : null}
      </div>
    </div>
  )
}
