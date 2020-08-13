import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardPromo from '../common/elements/CardPromo'
import { requestPromos } from '../../redux/promos-reducer'
import { getPromosSelector } from '../../redux/selectors/promos'


export const Promos: React.FC = () => {
    let promos = useSelector(getPromosSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Акции'
        window.scroll(0, 0)
    }, [])

    useEffect(() => {
        if (!promos.length) {
            dispatch(requestPromos())
        }
    }, [dispatch, promos.length])


    return (
        <main className='promos'>
            <h1 className='promos-title'>~ Акции ~</h1>
            <div className='promos-wrapper'>
                {promos.map(promo => <CardPromo promo={promo} key={promo._id}/>)}
            </div>
        </main>
    )
}
