import React from 'react'
import { connect } from 'react-redux'
import Halls from '../../pages/Halls/Halls'
import { createHall, deleteHall, getHall, getHalls, updateHall } from '../../redux/hall-reducer'
import { uploadFile } from '../../redux/file-reducer'

class HallsContainer extends React.Component {
    componentDidMount() {
        if (!Object.keys(this.props.halls).length) this.props.getHalls()
    }

    onLoad = ( files ) => {

    }

    handlerFile = ( files ) => {
        this.props.uploadFiles(files)
    }

    render() {
        let { hall } = this.props

        return <Halls halls={hall}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        halls: state.hallPage.halls,
        currentHall: state.hallPage.hall,
        buffer: state.file.buffer,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        getHalls: () => {
            dispatch(getHalls())
        },
        getCurrentHall: ( id ) => {
            dispatch(getHall(id))
        },
        createHall: ( hall ) => {
            dispatch(createHall(hall))
        },
        updateHall: ( hall ) => {
            dispatch(updateHall(hall))
        },
        deleteHall: ( id ) => {
            dispatch(deleteHall(id))
        },
        uploadFiles: ( files ) => {
            dispatch(uploadFile())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HallsContainer)
