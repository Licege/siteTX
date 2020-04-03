import React from 'react';
import {newsType} from "../../types/types";
import CardNews from "../common/elements/СardNews";

type PropsType = {
    news: Array<newsType>
}

const News: React.FC<PropsType> = ( {news} ) => {
    return (
        <div className='page-container'>
            <h4 className='page-container-title'>~ Новости ~</h4>
            {news.map(n =>
                <CardNews news={n} key={n.id}/>
            )}
        </div>
    )
};

export default News;