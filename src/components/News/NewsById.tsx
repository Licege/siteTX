import React from 'react'
import {newsType} from "../../types/types";
import altImg from  "../../static/img/news.jpg";
import {fullLink} from "../../plugins/helpers";
import Button from '@material-ui/core/Button';

interface IProps {
    news: newsType

    goBack: () => void
}

const NewsById: React.FC<IProps> = ({news, goBack}) => {
    return (
        <div className='page-container'>
            <div className='news'>
                <img src={news.imageSrc ? fullLink(news.imageSrc) : altImg} className='news-image' alt=''/>
                <div className='news-wrapper'>
                    <div className='news-wrapper-title'>{news.title}</div>
                    <div className='news-wrapper-action'>
                        <Button variant='outlined' onClick={goBack}>Все новости</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewsById;