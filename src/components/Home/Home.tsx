import React from 'react';
import {newsType} from "../../types/types";
import CustomSlider from "../common/elements/CustomSlider";
import Loader from "../common/elements/Loader";

type PropsType = {
    news: Array<newsType>
}

const Home: React.FC<PropsType> = ({news}) => {
    let url = "http://navse360.ru/onlyTour/4421"

    return (
        <div className='page-container'>
            <div>
                Ресторанный комплекс "Три холма" находится вдали от городской суеты, на берегу Голубых озер. С летней
                веранды ресторана открывается живописный вид на одно из них. Территория украшена цветами и фонтанами.
                Имеется детская летняя площадка с горками и качелями. В ресторане доступны три зала, идеально подходящих
                для проведения досуга в спокойной обстановке. Также в отдельном здании имеются два банкетных зала для
                проведения торжеств. Общая вместимость комплекса "Три холма" составляет 250 персон. Посетителям
                предлагается обширное и разнообразное меню, которое состоит из блюд европейской, кавказской и
                азербайджанской кухни.
            </div>
            <div>
                Акции
            </div>
            <div>
                <CustomSlider items={news} />
            </div>
            <div>
                Наше меню
            </div>
            <div>
                Доставка
            </div>
            <div>
                Карта
            </div>
            <div>
                <Loader />
            </div>
        </div>
    )
};

export default Home;