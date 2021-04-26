import React from 'react'
import LinkButton from '../../../components/common/elements/buttons/LinkButton'

interface IProps {
}

const SectionAbout: React.FC<IProps> = () => (
    <div className='Section-about'>
        <div className='Section-about-image'/>
        <div className='Section-about-block'>
            <h2 className='Section-about-block-header'>Добро пожаловать</h2>
            <div className='Section-about-block-info'>
                Ресторанный комплекс "Три холма" находится вдали от городской суеты, на берегу Голубых озер. С летней
                веранды ресторана открывается живописный вид на одно из них. Территория украшена цветами и фонтанами.
                Имеется детская летняя площадка с горками и качелями. В ресторане доступны три зала, идеально подходящих
                для проведения досуга в спокойной обстановке. Также в отдельном здании имеются два банкетных зала для
                проведения торжеств. Общая вместимость комплекса "Три холма" составляет 250 персон. Посетителям
                предлагается обширное и разнообразное меню, которое состоит из блюд европейской, кавказской и
                азербайджанской кухни.
            </div>
            <LinkButton to='/contacts' label='Подробнее о нас'/>
        </div>
    </div>
)

export default SectionAbout
