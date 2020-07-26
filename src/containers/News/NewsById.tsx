import React from 'react'
import {connect} from "react-redux";
import {RouteComponentProps} from 'react-router-dom';
import {AppStateType} from "../../redux/redux-store";
import {requestCurrentNews} from "../../redux/news-reducer";
import {newsType} from "../../types/types";
import NewsById from "../../components/News/NewsById";

interface IStateToProps {
    currentNews: newsType
    match: {params: {id: string}}
}

interface IDispatchToProps {
    getNewsById: (id: string) => void
}


class NewsByIdContainer extends React.Component<IStateToProps & IDispatchToProps & RouteComponentProps> {
    componentDidMount(): void {
        let id = this.props.match.params.id;
        if (!Object.keys(this.props.currentNews).length || this.props.currentNews._id !== id) this.props.getNewsById(id)
        document.title = 'Новости'
        window.scrollTo(0, 0)
    }

    goBack = () => {
        this.props.history.push('/news')
    }

    render() {
        return <NewsById news={this.props.currentNews} goBack={this.goBack} />;
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        currentNews: state.newsPage.currentNews
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        getNewsById: (id: string) => {
            dispatch(requestCurrentNews(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsByIdContainer)
