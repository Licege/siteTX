import React from 'react'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Actions} from "../../components/Actions/Actions";

class ActionsContainer extends React.Component {
    componentDidMount(): void {
        document.title = 'Акции'
    }

    render() {
        return <Actions />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {}
}

let mapDispatchToProps = (dispatch: any) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps) (ActionsContainer)