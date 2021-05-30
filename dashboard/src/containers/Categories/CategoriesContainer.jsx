import React from 'react'
import { connect } from 'react-redux'
import { deleteCategory, requestCategories } from '../../redux/thunks/menu.thunks'
import Index from '../../pages/Categories/all'

class CategoriesContainer extends React.PureComponent {
    componentDidMount() {
        if (!this.props.categories.length) this.props.getCategories()
    }

    create = () => this.props.history.push(`categories/new`)

    detail = ( id ) => () => this.props.history.push(`categories/edit/${id}`)

    remove = ( id ) => ( e ) => {
        e.stopPropagation()
        this.props.deleteCategory(id)
    }


    render() {
        return <Index categories={this.props.categories}
                      createCategory={this.create}
                      updateCategory={this.detail}
                      deleteCategory={this.remove}/>
    }
}

let mapStateToProps = ( state ) => {
    return {
        categories: state.menuPage.categories,
    }
}

let mapDispatchToProps = ( dispatch ) => {
    return {
        getCategories: () => {
            dispatch(requestCategories())
        },
        deleteCategory( id ) {
            dispatch(deleteCategory(id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer)
