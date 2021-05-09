import React from 'react'
import styled from 'styled-components'
import LinkButton from '../../../components/common/elements/buttons/LinkButton'
import { SectionTitle, SectionWrapper } from '../../../components/core'
import ImageSrc from '../../../static/img/veranda-2.jpg'

const SectionAbout = () => (
    <Container>
        <Image imageSrc={ImageSrc} />
        <Article>
          <Title>Добро пожаловать</Title>
            <Text>
                Ресторанный комплекс "Три холма" находится вдали от городской суеты, на берегу Голубых озер. С летней
                веранды ресторана открывается живописный вид на одно из них. Территория украшена цветами и фонтанами.
                Имеется детская летняя площадка с горками и качелями. В ресторане доступны три зала, идеально подходящих
                для проведения досуга в спокойной обстановке. Также в отдельном здании имеются два банкетных зала для
                проведения торжеств. Общая вместимость комплекса "Три холма" составляет 250 персон. Посетителям
                предлагается обширное и разнообразное меню, которое состоит из блюд европейской, кавказской и
                азербайджанской кухни.
            </Text>
            <LinkButton to='/contacts' label='Подробнее о нас'/>
        </Article>
    </Container>
)

const Container = styled(SectionWrapper)`
  display: flex;
  
  @media(max-width: 576px) {
    display: block;
  }
`

interface IImage {
  imageSrc: string
}

const Image = styled.div`
  margin: 20px;
  background-image: ${(props: IImage) => `url(${props.imageSrc})`};
  border-radius: 5px;
  width: 320px;
  height: 320px;
  
  @media(max-width: 576px) {
    margin: 0 auto;
  }
  
  @media(max-width: 768px) {
    width: 264px;
    height: 264px;
  }
`

const Article = styled.article`
  float: right;
  width: calc(100% - 350px);
  
  @media(max-width: 576px) {
    float: none;
    width: 100%;
  }
`
const Title = styled(SectionTitle)`
  margin-bottom: 20px;
  
  @media(max-width: 768px) {
    margin-top: 20px;
  }
`

const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
`

export default SectionAbout
