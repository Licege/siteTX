import React from 'react';
import Home from "../../components/Home/Home";
import {AppStateType} from "../../redux/redux-store";
import {connect} from 'react-redux';
import {contactsType, dishType, newsType} from '../../types/types';
import {requestNews} from "../../redux/news-reducer";
import {getMenu} from "../../redux/menu-reducer";
import {getContacts} from "../../redux/contacts-reducer";
import {addDishAC} from "../../redux/bucket-reducer";

type MapStatePropsType = {
    news: Array<newsType>
    menu: Array<dishType>
    contacts: contactsType
}
type MapDispatchPropsType = {
    getNews: () => void
    getMenu: () => void
    getContacts: () => void
    addDishToBucket: (dish: dishType) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

class HomeContainer extends React.Component<PropsType>{
    componentDidMount(): void {
        if (!this.props.news.length) this.props.getNews()
        this.props.getMenu()
        if (!Object.keys(this.props.contacts).length) this.props.getContacts()
        window.scrollTo(0, 0)
        document.title = 'Три Холма'
    }

    render() {
        const {news, menu, contacts, addDishToBucket} =this.props

        return <Home news={news} menu={menu} contacts={contacts} addDishToBucket={addDishToBucket}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.newsPage.news,
        menu: state.menuPage.menu,
        contacts: state.contacts.contacts
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        getNews: () => {
            dispatch(requestNews())
        },
        getMenu: () => {
            dispatch(getMenu())
        },
        addDishToBucket: (dish: dishType) => {
            dispatch(addDishAC(dish))
        },
        getContacts: () => {
            dispatch(getContacts())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);
