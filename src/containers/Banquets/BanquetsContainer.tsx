import React from 'react'
import { connect } from 'react-redux'
import { Banquets } from '../../components/Banquets/Banquets'
import { AppStateType } from '../../redux/redux-store'

class BanquetsContainer extends React.Component {
    componentDidMount(): void {
        document.title = 'Банкеты'
        window.scrollTo(0, 0)
    }

    render() {
        return <Banquets/>
    }
}

let mapStateToProps = ( state: AppStateType ) => {
    return {}
}

let mapDispatchToProps = ( dispatch: any ) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BanquetsContainer)
