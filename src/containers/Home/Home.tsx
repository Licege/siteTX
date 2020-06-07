import React from 'react';
import Home from "../../components/Home/Home";
import {AppStateType} from "../../redux/redux-store";
import {connect} from 'react-redux';
import {contactsType, dishType, newsType} from '../../types/types';
import {requestNews} from "../../redux/news-reducer";
import {getMenu} from "../../redux/menu-reducer";
import {getContacts} from "../../redux/contacts-reducer";

type MapStatePropsType = {
    news: Array<newsType>
    menu: Array<dishType>
    contacts: contactsType
}
type MapDispatchPropsType = {
    getNews: () => void
    getMenu: () => void
    getContacts: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

class HomeContainer extends React.Component<PropsType>{
    componentDidMount(): void {
        if (!this.props.news.length) this.props.getNews()
        if (!this.props.menu.length) this.props.getMenu()
        if (!Object.keys(this.props.contacts).length) this.props.getContacts()
    }

    render() {
        const {news, menu, contacts} =this.props

        return <Home news={news} menu={menu} contacts={contacts}/>
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
        getContacts: () => {
            dispatch(getContacts())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (HomeContainer);