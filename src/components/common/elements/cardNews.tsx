import React from 'react';
import {newsType} from "../../../types/types";
import altImg from  "../../../static/img/news.jpg";

type PropsType = {
    news: newsType
}

const CardNews: React.FC<PropsType> = ( {news} ) => {
    return (
        <div className='card_news'>
            <div className='card'>
                <div className='card-body card_news-content'>
                    {news.create_at && <div>{news.create_at}</div>}
                    <img className='card_news-content-img' src={news.url ? news.url : altImg} alt='' />
                    <div className='card_news-content-info'>
                        <div className='card_news-content-info-header'>
                            {news.label && <a href='#' className='card_news-content-info-header-title'>{news.label}</a>}
                        </div>
                        {news.content && <div className='card_news-content-info-description'>{news.content}</div>}
                        <div className='card_news-content-info-link'>
                            <a href='#'>Подробнее...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardNews;