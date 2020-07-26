import React from 'react'
import {connect} from "react-redux";
import {Action} from "../../components/Actions/Action";
import {RouteComponentProps} from "react-router";
import {AppStateType} from "../../redux/redux-store";
import {promoType} from "../../types/types";
import {requestPromoById} from "../../redux/promos-reducer";

interface IProps {
    promo: promoType
    match: {params: {id: string}}

    getPromoById: (id: string) => void
}

class ActionContainer extends React.Component<IProps & RouteComponentProps> {
    componentDidMount(): void {
        let id = this.props.match.params.id
        this.props.getPromoById(id)
        this.props.promo?.title ? document.title = this.props.promo.title : document.title = 'Акции'
        window.scrollTo(0, 0)
    }

    goBack = () => {
        this.props.history.push('/actions')
    }


    render() {
        let {promo} = this.props

        return <Action promo={promo} goBack={this.goBack} />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        promo: state.promosPage.currentPromo
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        getPromoById: (id: string) => {
            dispatch(requestPromoById(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ActionContainer)
