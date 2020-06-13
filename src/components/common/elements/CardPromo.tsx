import React from 'react'
import {promoType} from "../../../types/types";

interface IProps {
    promo: promoType
}

const CardPromo: React.FC<IProps> = ( {promo} ) => (
    <div style={{border: '1px solid grey'}}>
        123
    </div>
)

export default CardPromo