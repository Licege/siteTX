import React from 'react'
import { categoryType } from '../../types/types'
import { AppStateType } from '../../redux/redux-store'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Header from '../../components/Header/Header'
import { getCategories } from '../../redux/menu-reducer'

type MapStatePropsType = {
    categories: Array<categoryType>
}
type MapDispatchPropsType = {
    getCategories: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        if (!this.props.categories.length) this.props.getCategories()
    }

    render() {
        return <Header categories={this.props.categories}/>
    }
}

let mapStateToProps = ( state: AppStateType ) => {
    return {
        categories: state.menuPage.categories,
    }
}

let mapDispatchToProps = ( dispatch: any ) => {
    return {
        getCategories: () => {
            dispatch(getCategories())
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(HeaderContainer)
