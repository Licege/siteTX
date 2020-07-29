import React from 'react'
import Rating from './Rating'

interface IProps {
    input: {
        value: number
        onChange: ( value: number ) => void
    }
    countStars?: number
    sizeStar?: number
    disabled?: boolean
}

const renderRatingField: React.FC<IProps> = ( {input: {value, onChange}, countStars, sizeStar, disabled} ) => (
    <div>
        <Rating value={value} countStars={countStars} size={sizeStar} onChange={onChange} disabled={disabled}/>
    </div>
)

export default renderRatingField
