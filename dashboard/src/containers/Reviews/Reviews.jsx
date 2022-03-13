import React from 'react'
import {connect} from 'react-redux'
import {changeReviewStatus, requestReviews} from '../../redux/reviews-reducer'
import Reviews from '../../pages/Reviews/Reviews'

class ReviewsContainer extends React.PureComponent {
  componentDidMount() {
    if (!this.props.reviews.length) this.props.getReviews()
  }

    onApprove = ( review ) => {
      return () => {
        this.props.changeStatus({...review, status: 1})
      }
    }

    onDisapprove = ( review ) => {
      return () => {
        this.props.changeStatus({...review, status: 2})
      }
    }

    render() {
      return (
        <Reviews waitingReviews={this.props.waitingReviews}
                 approvedReviews={this.props.approvedReviews}
                 disapprovedReviews={this.props.disapprovedReviews}
                 onApprove={this.onApprove}
                 onDisapprove={this.onDisapprove} />
      )
    }
}

const mapStateToProps = ( state ) => {
  return {
    reviews: state.reviewsPage.reviews,
    waitingReviews: state.reviewsPage.reviews.filter(review => review.status === 0),
    approvedReviews: state.reviewsPage.reviews.filter(review => review.status === 1),
    disapprovedReviews: state.reviewsPage.reviews.filter(review => review.status === 2),
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    getReviews: () => {
      dispatch(requestReviews())
    },
    changeStatus: ( review ) => {
      dispatch(changeReviewStatus(review))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer)
