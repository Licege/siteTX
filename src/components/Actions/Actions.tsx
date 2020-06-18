import React, {DetailedHTMLProps, HTMLAttributes} from 'react'
import {promoType} from "../../types/types";

interface IProps {
    promos: Array<promoType>

}

export const Actions: React.FC<IProps> = (props) => {
    let {promos} = props
    return (
        <div className='actions page-container'>
            {promos.map(promo => (
                promo.show
                    ? <div key={promo._id}>
                        <div>{promo.title}</div>
                        <div>{promo.short_description}</div>
                        <div dangerouslySetInnerHTML={ {__html: promo.description} }/>
                    </div>
                    : null
            ))}
        </div>
    )
}