import React from 'react';
import {newsType} from "../../types/types";
import CardNews from "../common/elements/CardNews";
import Paginator from "../common/elements/Paginator";

type PropsType = {
    news: Array<newsType>
    totalCount: number

    onPageCount: (page: number) => void
}

const News: React.FC<PropsType> = ( {news, totalCount, onPageCount} ) => {
    return (
        <div className='page-container'>
            <h4 className='page-container-title'>~ Новости ~</h4>
            {news && news.map(item =>
                <CardNews news={item} key={item._id}/>
            )}

            {news && <Paginator totalItemsCount={totalCount} onChange={onPageCount} />}
        </div>
    )
};

export default News;