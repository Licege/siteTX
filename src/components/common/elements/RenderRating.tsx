import React from 'react';
import Rating from './Rating'

interface IProps {
    input: {
        value: number
        onChange: (value: number) => void
    }
    countStars?: number
    sizeStar?: number
}

const renderRatingField: React.FC<IProps> = ( {input: { value, onChange }, countStars, sizeStar} ) => (
        <div>
            <Rating value={value} countStars={countStars} size={sizeStar} onChange={onChange} />
        </div>
)

export default renderRatingField;