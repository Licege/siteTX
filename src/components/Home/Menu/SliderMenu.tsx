import React from 'react'
import {dishType} from "../../../types/types";
import CardDish from "../../common/elements/CardDish";
import CustomSlider from "../../common/elements/CustomSlider";

interface IProps {
    menu: Array<dishType>
}

const SliderMenu: React.FC<IProps> = ({menu}) => (
    <CustomSlider>
        {menu.map(dish =>
            <CardDish dish={dish} key={dish._id} addToBucket={() =>{}}/>
        )}
    </CustomSlider>
)

export default SliderMenu;
