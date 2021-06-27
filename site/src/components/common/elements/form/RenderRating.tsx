import React from 'react'
import Rating from '../Rating'

const renderRatingField: React.FC<any>
    = ({
      input: {
        value,
        onChange,
      },
      countStars,
      sizeStar,
      disabled,
    }) => (
      <div>
        <Rating value={value} countStars={countStars} size={sizeStar} onChange={onChange} disabled={disabled}/>
      </div>
    )

export default renderRatingField
