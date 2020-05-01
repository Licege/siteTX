import React from 'react';
import Home from "../../components/Home/Home";
import {AppStateType} from "../../redux/redux-store";
import {connect} from 'react-redux';
import {newsType} from '../../types/types';
import {requestNews} from "../../redux/news-reducer";

type MapStatePropsType = {
    news: Array<newsType>
}
type MapDispatchPropsType = {
    getNews: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

class HomeContainer extends React.Component<PropsType>{
    componentDidMount(): void {
        if (!this.props.news.length) this.props.getNews()
    }

    render() {
        return <Home news={this.props.news}/>
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

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);