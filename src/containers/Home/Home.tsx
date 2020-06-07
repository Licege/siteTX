import React from 'react';
import Home from "../../components/Home/Home";
import {AppStateType} from "../../redux/redux-store";
import {connect} from 'react-redux';
import {dishType, newsType} from '../../types/types';
import {requestNews} from "../../redux/news-reducer";
import {getMenu} from "../../redux/menu-reducer";

type MapStatePropsType = {
    news: Array<newsType>
    menu: Array<dishType>
}
type MapDispatchPropsType = {
    getNews: () => void
    getMenu: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

class HomeContainer extends React.Component<PropsType>{
    componentDidMount(): void {
        if (!this.props.news.length) this.props.getNews()
        if (!this.props.menu.length) this.props.getMenu()
    }

    render() {
        const {news, menu} =this.props

        return <Home news={news} menu={menu}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.newsPage.news,
        menu: state.menuPage.menu,
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        getNews: () => {
            dispatch(requestNews())
        },
        getMenu: () => {
            dispatch(getMenu())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);