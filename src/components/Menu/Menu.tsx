import React from 'react';
import {category, dish} from '../../types/types';

type PropsType = {
    menu: Array<dish>,
    categories: Array<category>
}

const Menu: React.FC<PropsType> = (props) => {
    return (
        <div>Меню</div>
    )
};

export default Menu;