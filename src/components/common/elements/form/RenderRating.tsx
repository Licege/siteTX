import React from 'react'
import Rating from '../Rating'
import { WrappedFieldProps } from 'redux-form'

interface IProps {
    countStars?: number
    sizeStar?: number
    disabled?: boolean
}

const renderRatingField: React.FC<WrappedFieldProps & IProps>
    = ( {
            input: {
                value,
                onChange,
            },
            countStars,
            sizeStar,
            disabled,
        } ) => (
    <div>
        <Rating value={value} countStars={countStars} size={sizeStar} onChange={onChange} disabled={disabled}/>
    </div>
)

export default renderRatingField
