import React from 'react'
import {requestNewsById, updateNews} from '../../redux/thunks/news.thunks'
import {connect} from 'react-redux'
import Preloader from '../../components/common/Preloader/Preloader'
import NewsForm from '../../pages/News/NewsForm'

class EditNewsContainer extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      file: '',
    }
  }

  refreshDetailNews() {
    let id = this.props.match.params.id
    this.props.getCurrentNews(id)
  }

  componentDidMount() {
    this.refreshDetailNews()
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.refreshDetailNews()
    }
  }

    updateNews = ( news ) => {
      let formData = new FormData()
      for (let key in news) {
        formData.append(key, news[key])
      }
      this.state.file && formData.append('image', this.state.file)
      this.props.updateCurrentNews(formData, news.id)
      this.props.history.goBack()
    }

    uploadFile = ( file ) => {
      this.setState({file})
    }

    cancel = () => {
      this.props.history.goBack()
    }

    render() {
      return this.props.isFetching ? <Preloader/> :
      <NewsForm initialValues={this.props.currentNews}
                onSubmit={this.updateNews}
                news={this.props.currentNews}
                uploadFile={this.uploadFile}
                cancel={this.cancel}/>

    }
}

let mapStateToProps = ( state ) => {
  return {
    currentNews: state.newsPage.currentNews,
    isFetching: state.newsPage.isFetching,
  }
}

let mapDispatchToProps = ( dispatch ) => {
  return {
    getCurrentNews: ( id ) => {
      dispatch(requestNewsById(id))
    },
    updateCurrentNews: ( currentNews, id ) => {
      dispatch(updateNews(currentNews, id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNewsContainer)
