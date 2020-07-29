import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'
import { Actions } from '../../components/Actions/Actions'
import { requestPromos } from '../../redux/promos-reducer'
import { promoType } from '../../types/types'

interface IProps {
    promos: Array<promoType>

    getPromos: () => void
}

class ActionsContainer extends React.Component<IProps> {
    componentDidMount(): void {
        document.title = 'Акции'
        if (!this.props.promos.length) this.props.getPromos()
        window.scrollTo(0, 0)
    }

    render() {
        return <Actions promos={this.props.promos}/>
    }
}

let mapStateToProps = ( state: AppStateType ) => {
    return {
        promos: state.promosPage.promos,
    }
}

let mapDispatchToProps = ( dispatch: any ) => {
    return {
        getPromos: () => {
            dispatch(requestPromos())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsContainer)
