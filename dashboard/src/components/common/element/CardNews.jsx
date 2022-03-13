import React from 'react'
import altImg from '../../../static/img/news.jpg'
import {tsToDate} from '../../../plugins/helpers'
import Button from 'react-bootstrap/Button'

const CardNews = ({news, deleteNews, detail}) => {
  return (
    <div className='card_news'>
      <div className='card'>
        <div className='card-body card_news-content'>
          {news.createdAt &&
            <div className='card_news-content-date'>{tsToDate(news.createdAt, 'dd MMMM')}</div>}
          <img className='card_news-content-img' src={news.imageSrc || altImg} alt=''/>
          <div className='card_news-content-info'>
            <div className='card_news-content-info-header'>
              {news.title && <a href={'news/edit/' + news.id}
                                className='card_news-content-info-header-title'>{news.title}</a>}
            </div>
            {news.shortDescription &&
            <div className='card_news-content-info-description'>{news.shortDescription}</div>}
            {news.description && !news.shortDescription &&
            <div className='card_news-content-info-description'>{news.description}</div>}
            <div className='card_news-content-info-link'>
              <Button onClick={detail(news.id)}>Подробнее</Button>
              <Button onClick={deleteNews(news.id)}>Удалить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardNews
