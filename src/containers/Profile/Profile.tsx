import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../redux/redux-store'

class ProfileContainer extends React.PureComponent {

}

let mapStateToProps = ( state: AppStateType ) => {
    return {
        profile: state.authPage,
    }
}

let mapDispatchToProps = ( dispatch: any ) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
