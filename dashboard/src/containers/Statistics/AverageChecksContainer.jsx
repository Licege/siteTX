import React from 'react'
import { AverageChecks } from '../../pages/Statistics/AverageChecks'
import { requestAvgChecks } from '../../redux/Statistics/average-checks-reducer'
import { connect } from 'react-redux'

const fieldFilter = []

class AverageChecksContainer extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            filter: {},
            startDate: null,
            endDate: null,
        }
    }

    componentDidMount() {
        if (!this.props.avgChecks.length) this.props.getAvgChecks()
    }

    handleChange = ( type ) => {
        return ( date ) => {
            switch (type) {
                case 'start':
                    this.setState({ startDate: date })
                    break
                case 'end':
                    this.setState({ endDate: date })
                    break
                default:
                    return ''
            }
        }
    }

    changeFilter = () => {
        let data = this.state.filter

        if (this.state.startDate) {
            data.create_at_start = this.state.startDate
            this.setState({ filter: data })
        } else if (data.create_at_start) {
            delete (data.create_at_start)
            this.setState({ filter: data })
        }

        if (this.state.endDate) {
            data.create_at_end = this.state.endDate
            this.setState({ filter: data })
        } else if (data.create_at_end) {
            delete (data.create_at_end)
            this.setState({ filter: data })
        }

        this.props.getAvgChecks(data)
    }

    clearFilter = () => {
        fieldFilter.forEach(field => document.getElementById(field).value = '')
        this.setState({ filter: {}, startDate: '', endDate: '' })
        this.props.getAvgChecks()
    }

    render() {
        let {
            startDate,
            endDate,
        } = this.state

        let {
            avgChecks,
        } = this.props

        return <AverageChecks avgChecks={avgChecks}
                              startDate={startDate}
                              endDate={endDate}
                              handleChange={this.handleChange}
                              changeFilter={this.changeFilter}
                              clearFilter={this.clearFilter}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        avgChecks: state.avgChecksPage.avgChecks,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        getAvgChecks: ( filter ) => {
            dispatch(requestAvgChecks(filter))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AverageChecksContainer)
