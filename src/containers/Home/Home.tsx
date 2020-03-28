import React from 'react';
import Home from "../../components/Home/Home";
import {AppStateType} from "../../redux/redux-store";
import {compose} from 'redux';
import {connect} from 'react-redux';

type MapStatePropsType = {}
type MapDispatchPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType;

class HomeContainer extends React.Component<PropsType>{
    componentDidMount(): void {
    }

    render() {
        return <Home/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {

    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {

    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (HomeContainer);