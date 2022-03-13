import React from 'react'
import News from '../../pages/News/main/News'
import {createNewNews, deleteNews, requestAllNews} from '../../redux/thunks/news.thunks'
import {compose} from 'redux'
import {connect} from 'react-redux'
import Preloader from '../../components/common/Preloader/Preloader'


class NewsContainer extends React.Component {
  componentDidMount() {
    if (!this.props.news || !this.props.news.length) this.props.getNews()
  }

    detail = ( id ) => {
      return () => {
        this.props.history.push(`news/edit/${id}`)
      }
    }

    createNews = () => {
      this.props.history.push('news/new')
    }

    deleteNews = ( id ) => {
      return () => {
        this.props.deleteNews(id)
      }
    }

    render() {
      return <>
        {this.props.isFetching ? <Preloader/> : null}
        <News news={this.props.news} createNews={this.createNews} deleteNews={this.deleteNews}
              detail={this.detail}/>
      </>
    }
}

let mapStateToProps = ( state ) => {
  return {
    news: state.newsPage.news,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    createNews: ( news ) => {
      dispatch(createNewNews(news))
    },
    getNews: () => {
      dispatch(requestAllNews())
    },
    deleteNews: ( id ) => {
      dispatch(deleteNews(id))
    },
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(NewsContainer)
