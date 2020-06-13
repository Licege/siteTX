import React from 'react';
import {newsType} from "../../types/types";
import CardNews from "../common/elements/CardNews";
import Paginator from "../common/elements/Paginator";
import {CSSTransition, TransitionGroup} from "react-transition-group";

type PropsType = {
    news: Array<newsType>
    totalCount: number

    onPageCount: (page: number) => void
}

const News: React.FC<PropsType> = ( {news, totalCount, onPageCount} ) => {
    return (
        <div className='page-container'>
            <h4 className='page-container-title'>~ Новости ~</h4>
            <TransitionGroup component={null}>
            {news && news.map(item =>
                    <CSSTransition
                        timeout={3000}
                        classNames='card_animation'
                        key={item._id}
                        mountOnEnter
                        unmountOnExit
                    >
                        <CardNews news={item} key={item._id} />
                    </CSSTransition>
            )}
            </TransitionGroup>

            {news && <Paginator totalItemsCount={totalCount} onChange={onPageCount} />}
        </div>
    )
};

export default News;