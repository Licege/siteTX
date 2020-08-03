import React from 'react'
import {promoType} from "../../types/types";
import CardPromo from "../common/elements/CardPromo";

interface IProps {
    promos: Array<promoType>

}

export const Actions: React.FC<IProps> = (props) => {
    let {promos} = props
    return (
        <main className='promos'>
            <h1 className='promos-title'>~ Акции ~</h1>
            <div className='promos-wrapper'>
                {promos.map(promo => <CardPromo promo={promo} key={promo._id}/>)}
            </div>
        </main>
    )
}
