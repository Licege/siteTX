import React from 'react';
import Home from "../../components/Home/Home";
import {AppStateType} from "../../redux/redux-store";
import {connect} from 'react-redux';
import {contactsType, dishType, newsType, promoType} from '../../types/types';
import {requestNews} from "../../redux/news-reducer";
import {getMenu} from "../../redux/menu-reducer";
import {getContacts} from "../../redux/contacts-reducer";
import {addDishAC} from "../../redux/bucket-reducer";
import {requestPromos} from "../../redux/promos-reducer";

type MapStatePropsType = {
    news: Array<newsType>
    menu: Array<dishType>
    promos: Array<promoType>
    contacts: contactsType
}
type MapDispatchPropsType = {
    getNews: () => void
    getMenu: () => void
    getPromos: () => void
    getContacts: () => void
    addDishToBucket: (dish: dishType) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

class HomeContainer extends React.Component<PropsType>{
    componentDidMount(): void {
        if (!this.props.news.length) this.props.getNews()
        if (!this.props.promos.length) this.props.getPromos()
        this.props.getMenu()
        if (!Object.keys(this.props.contacts).length) this.props.getContacts()
        window.scrollTo(0, 0)
        document.title = 'Три Холма'
    }

    render() {
        const {news, menu, promos, contacts, addDishToBucket} =this.props

        return <Home news={news}
                     menu={menu}
                     promos={promos}
                     contacts={contacts}
                     addDishToBucket={addDishToBucket}/>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.newsPage.news,
        menu: state.menuPage.menu,
        promos: state.promosPage.promos,
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
        getPromos: () => {
            dispatch(requestPromos())
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
