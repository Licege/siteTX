import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardNews from '../../components/common/elements/CardNews'
import Paginator from '../../components/common/elements/Paginator'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { getNewsCountSelector, getNewsSelector } from '../../redux/selectors/news'
import { requestNews } from '../../redux/thunks/news.thunk'
import EmptyPage from '../empyPage';


const News: React.FC = () => {
    let news = useSelector(getNewsSelector)
    let totalCount = useSelector(getNewsCountSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Новости'
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(requestNews())
    }, [dispatch])

    const onPageChange = (page: number) => {
        dispatch(requestNews(page))
    }

    if (!news.length) return <EmptyPage />

    return (
        <main className='page-container'>
            <h1 className='page-container-title'>~ Новости ~</h1>
            <TransitionGroup component={null}>
                {news?.map((item: any) =>
                    <CSSTransition
                        timeout={2000}
                        classNames='card_animation'
                        key={item.id}
                        mountOnEnter
                        unmountOnExit
                    >
                        <CardNews news={item} key={item.id}/>
                    </CSSTransition>,
                )}
            </TransitionGroup>

            {news && <Paginator totalItemsCount={totalCount} onChange={onPageChange}/>}
        </main>
    )
}

export default News
