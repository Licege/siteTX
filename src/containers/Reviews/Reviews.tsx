import React from 'react'
import {AppStateType} from "../../redux/redux-store";
import {postReview, requestReviews} from "../../redux/reviews-reducer";
import {IReview} from '../../types/types';
import {connect} from "react-redux";
import Reviews from "../../components/Reviews/Reviews";

type MapStatePropsType = {
    reviews: Array<IReview>
    isAuthenticated: boolean
}
type MapDispatchPropsType = {
    getReviews: () => void
    postReview: (review: IReview) => void
}
type StateType = {
    open: boolean
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class ReviewsContainer extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props)
        this.state = {
            open: false
        } as StateType
    }

    componentDidMount(): void {
        if (!this.props.reviews.length) this.props.getReviews();
        document.title = 'Отзывы'
        window.scrollTo(0, 0)
    }

    toggle = () => {
        this.setState({open: !this.state.open})
    }

    onSubmit = (data: IReview) => {
        let post = {
            ...data,
            create_at: Date.parse(new Date().toString()),
            status: 0
        }
        console.log(post)
        this.props.postReview(post)
    }


    render() {
        return (
            <Reviews reviews={this.props.reviews} isAuthenticated={this.props.isAuthenticated} isOpen={this.state.open} toggleModal={this.toggle} onSubmit={this.onSubmit} />
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        reviews: state.reviewsPage.reviews.filter(review => review.status !== 0),
        isAuthenticated: state.authPage.isAuthenticated
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        getReviews: () => {
            dispatch(requestReviews())
        },
        postReview: (review: IReview) => {
            dispatch(postReview(review))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ReviewsContainer);
