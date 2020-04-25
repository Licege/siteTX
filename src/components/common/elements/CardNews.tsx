import React from 'react';
import {Link} from "react-router-dom";
import {newsType} from "../../../types/types";
import altImg from  "../../../static/img/news.jpg";
import {fullLink, tsToDate} from "../../../plugins/helpers";


type PropsType = {
    news: newsType
}

const CardNews: React.FC<PropsType> = ({news} ) => {
    return (
        <div className='card_news'>
            <div className='card'>
                <div className='card-body card_news-content'>
                    {news.create_at && <div className='card_news-date'>{tsToDate(news.create_at, 'dd MMMM')}</div>}
                    <img className='card_news-content-img' src={news.imageSrc ? fullLink(news.imageSrc) : altImg} alt='' />
                    <div className='card_news-content-info'>
                        <div className='card_news-content-info-header'>
                            {news.title && <a href='#' className='card_news-content-info-header-title'>{news.title}</a>}
                        </div>
                        {news.short_description && <div className='card_news-content-info-description'>{news.short_description}</div>}
                        <div className='card_news-content-info-link'>
                            <Link to={'/news/'+news._id} >Подробнее...</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardNews;