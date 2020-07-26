import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {newsType} from "../../types/types";
import {requestNews} from "../../redux/news-reducer";
import News from "../../components/News/News";

type MapStateToPropsType = {
    news: Array<newsType>
    totalCount: number
}
type MapDispatchPropsType = {
    getNews: (page?: number | undefined) => void
}

type PropsType = MapStateToPropsType & MapDispatchPropsType;

class NewsContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.news || !this.props.news.length) this.props.getNews();
        document.title = 'Новости'
        window.scrollTo(0, 0)
    }

    onPageChange = (page: number) => {
        this.props.getNews(page)
    }

    render () {
        return <News
                    news={this.props.news}
                    totalCount={this.props.totalCount}
                    onPageCount={this.onPageChange}
                />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.newsPage.news,
        totalCount: state.newsPage.totalCount
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        getNews: (page: number | undefined) => {
            dispatch(requestNews(page))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (NewsContainer);
