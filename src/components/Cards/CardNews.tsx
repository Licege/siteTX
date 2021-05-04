import React from 'react'
import { Link } from 'react-router-dom'
import { newsType } from '../../types/types'
import altImg from '../../static/img/news.jpg'
import { fullLink, tsToDate } from '../../plugins/helpers'


type PropsType = {
    news: newsType
}

const CardNews: React.FC<PropsType> = ({ news }) => (
    <div className='card_news'>
        <div className='card'>
            <div className='card-body card_news__wrapper'>
                {news.createdAt && <div className='card_news-date'>{tsToDate(news.createdAt, 'dd MMMM')}</div>}
                <div className='card_news-content'>
                    <img className='card_news-content-img' src={news.imageSrc ? fullLink(news.imageSrc) : altImg}
                         alt=''/>
                    <div className='card_news-content-info'>
                        <div className='card_news-content-info-header'>
                            {news.title &&
                            <Link to={'/news/' + news.id} className='card_news-content-info-header-title'>
                                {news.title}
                            </Link>}
                        </div>
                        {news.shortDescription &&
                        <div className='card_news-content-info-description'>{news.shortDescription}</div>}
                        <div className='card_news-content-info-link'>
                            <Link to={'/news/' + news.id}>Подробнее...</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default CardNews
