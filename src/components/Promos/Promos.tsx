import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardPromo from '../common/elements/CardPromo'
import { requestPromos } from '../../redux/thunks/promos.thunk'
import { getPromosSelector } from '../../redux/selectors/promos'
import EmptyPage from '../../pages/empyPage'


export const Promos: React.FC = () => {
    const promos = useSelector(getPromosSelector)
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

    if (!promos.length) return <EmptyPage />

    return (
        <main className='promos'>
            <h1 className='promos-title'>~ Акции ~</h1>
            <div className='promos-wrapper'>
                {promos.map((promo: any) => <CardPromo promo={promo} key={promo.id}/>)}
            </div>
        </main>
    )
}
