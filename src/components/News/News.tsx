import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardNews from '../common/elements/CardNews'
import Paginator from '../common/elements/Paginator'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { getNewsCountSelector, getNewsSelector } from '../../redux/selectors/news'
import { requestNews } from '../../redux/news-reducer'


const News: React.FC = () => {
    let news = useSelector(getNewsSelector)
    let totalCount = useSelector(getNewsCountSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Новости'
        window.scrollTo(0, 0)
        dispatch(requestNews())
    }, [dispatch])

    const onPageChange = (page: number) => {
        dispatch(requestNews(page))
    }

    return (
        <main className='page-container'>
            <h1 className='page-container-title'>~ Новости ~</h1>
            <TransitionGroup component={null}>
                {news && news.map(item =>
                    <CSSTransition
                        timeout={2000}
                        classNames='card_animation'
                        key={item._id}
                        mountOnEnter
                        unmountOnExit
                    >
                        <CardNews news={item} key={item._id}/>
                    </CSSTransition>,
                )}
            </TransitionGroup>

            {news && <Paginator totalItemsCount={totalCount} onChange={onPageChange}/>}
        </main>
    )
}

export default News
