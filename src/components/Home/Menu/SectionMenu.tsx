import React from 'react'
import {dishType} from "../../../types/types";
import SliderMenu from "./SliderMenu";
import LinkButton from "../../common/elements/buttons/LinkButton";

interface IProps {
    menu: Array<dishType>
}

const SectionMenu: React.FC<IProps> = ({menu}) => (
    <div className='Section-menu'>
        <div className='Section-menu-header'>Наше меню</div>
        <SliderMenu menu={menu}/>
        <LinkButton to='/menu' label={`Смотреть все меню из ${menu.length} блюд`}/>
    </div>
)

export default SectionMenu