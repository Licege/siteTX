import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { fullLink } from '../../plugins/helpers'
import { getCurrentNewsSelector } from '../../redux/selectors/news'
import { requestCurrentNews } from '../../redux/news-reducer'
import altImg from '../../static/img/news.jpg'

interface IParams {
    id: string
}

const NewsById: React.FC = () => {
    let news = useSelector(getCurrentNewsSelector)
    let history = useHistory()
    let { id } = useParams<IParams>()
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Новости'
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(requestCurrentNews(id))
    }, [dispatch, id])

    const goBack = () => history.push('/news')

    return (
        <div className='page-container'>
            <div className='news'>
                <img src={news.imageSrc ? fullLink(news.imageSrc) : altImg} className='news-image' alt=''/>
                <div className='news-wrapper'>
                    <div className='news-wrapper-title'>{news.title}</div>
                    <div className='news-wrapper-body'>{news.description}</div>
                    <div className='news-wrapper-action'>
                        <Button variant='outlined' onClick={goBack}>Все новости</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewsById
