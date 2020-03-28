import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {connect} from "react-redux";
import {newsType} from "../../types/types";
import {requestNews} from "../../redux/news-reducer";
import News from "../../components/News/News";

type MapStateToPropsType = {
    news: Array<newsType>
}
type MapDispatchPropsType = {
    getNews: () => void
}

type PropsType = MapStateToPropsType & MapDispatchPropsType;

class NewsContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.news.length) this.props.getNews();
    }

    render () {
        return <News news={this.props.news}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.newsPage.news
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        getNews: () => {
            dispatch(requestNews())
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (NewsContainer);