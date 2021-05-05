import React, { CSSProperties, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { getPromoSelector } from '../../redux/selectors/promos'
import { requestPromoById } from '../../redux/thunks/promos.thunk'
import { fullLink } from '../../plugins/helpers'
import altImg from '../../static/img/dish.svg'

interface IParams {
    id: string
}

export const Promo: React.FC = () => {
    let promo = useSelector(getPromoSelector)
    let history = useHistory()
    let { id } = useParams<IParams>()
    const dispatch = useDispatch()

    useEffect(() => {
        window.scroll(0, 0)
        dispatch(requestPromoById(id))
    }, [ dispatch, id ])

    useEffect(() => {
        document.title = promo?.title || 'Акции'
    }, [ promo ])

    const goBack = () => history.push('/actions')

    const style = {
        backgroundImage: `url(${promo.imageSrc || altImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } as CSSProperties


    return (
        <div className='promo'>
            <div className='promo-img' style={style}/>
            <div className='promo__wrapper'>
                <div className='promo__wrapper-content'>
                    <div className='promo-title'>{promo.title}</div>
                    <div className='promo-description' dangerouslySetInnerHTML={{ __html: promo.description }}/>
                    <div className='promo-actions'>
                        <Button variant='outlined' onClick={goBack}>Все акции</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
