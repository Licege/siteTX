import React from 'react';
import {newsType} from "../../types/types";
import CardNews from "../common/elements/cardNews";

type PropsType = {
    news: Array<newsType>
}

const News: React.FC<PropsType> = ( {news} ) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h4 className='page-title'>~ Новости ~</h4>
                {news.map(n =>
                    <CardNews news={n} key={n.id}/>
                )}
            </div>
        </div>
    )
};

export default News;