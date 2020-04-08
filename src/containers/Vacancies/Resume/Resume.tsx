import React from 'react'
import {AppStateType} from "../../../redux/redux-store";
import {postResume} from "../../../redux/vacancies-reducer";
import {resumeType, vacancyType} from "../../../types/types";
import {connect} from "react-redux";
import {compose} from 'redux';
import Resume from "../../../components/Vacancancies/Resume/Resume";

type MapStatePropsType = {
    resume: resumeType
    vacancies: Array<vacancyType>
    match?: {params: {id: string}}
}

type MapDispatchPropsType = {
    postResume: (resume: resumeType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class ResumeContainer extends React.Component<PropsType> {
    postResume(data: any) {
        console.log(data)
    }

    render() {
        return <Resume vacancies={this.props.vacancies}
                       resume={this.props.resume}
                       postResume={this.postResume}
                       id={this.props.match!.params.id} />
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        resume: state.vacanciesPage.resume,
        vacancies: state.vacanciesPage.vacancies
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        postResume: (resume: resumeType) => {
            dispatch(postResume(resume))
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps)) (ResumeContainer)