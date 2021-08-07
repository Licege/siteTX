import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { newsType } from '../../types/types'
import altImg from '../../static/img/news.jpg'
import { tsToDate } from '../../plugins/helpers'


type PropsType = {
    news: newsType
}

const CardNews: React.FC<PropsType> = ({ news }) => (
  <div className='card_news'>
    <div className='card'>
      <div className='card-body card_news__wrapper'>
        {news.createdAt && <div className='card_news-date'>{tsToDate(news.createdAt, 'dd MMMM')}</div>}
        <div className='card_news-content'>
          <Image src={news.imageSrc || altImg} alt=''/>
          <div className='card_news-content-info'>
            <div className='card_news-content-info-header'>
              {news.title &&
                <Link to={`/news/${  news.id}`} className='card_news-content-info-header-title'>
                  {news.title}
                </Link>}
            </div>
            {news.shortDescription &&
            <div className='card_news-content-info-description'>{news.shortDescription}</div>}
            <div className='card_news-content-info-link'>
              <Link to={`/news/${  news.id}`}>Подробнее...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Image = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 8px;
  border-radius: 3px;
  user-select: none;
  align-self: center;
`

export default CardNews
