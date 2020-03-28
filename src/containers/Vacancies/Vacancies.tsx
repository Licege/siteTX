import React from 'react';
import {AppStateType} from "../../redux/redux-store";
import {getVacancies} from "../../redux/vacancies-reducer";
import {connect} from "react-redux";
import {compose} from 'redux';
import {vacancyType} from "../../types/types";
import Vacancies from "../../components/Vacancancies/Vacancies";

type MapStateToPropsType = {
    vacancies: Array<vacancyType>
}
type MapDispatchToPropsType = {
    getVacancies: () => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

class VacanciesContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.vacancies.length) this.props.getVacancies();
        console.log(this.props.vacancies)
    }

    render() {
        return <Vacancies vacancies={this.props.vacancies} />;
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        vacancies: state.vacanciesPage.vacancies
    }
} ;
let mapDispatchToProps = (dispatch: any) => {
    return {
        getVacancies: () => {
            dispatch(getVacancies())
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)) (VacanciesContainer);