import React from 'react'
import styled from 'styled-components'
import { SectionTitle, SectionWrapper } from '../../../components/core'
import ImageSrc from '../../../static/img/veranda-2.jpg'
import { BREAKPOINTS } from '../../../styledComponents/helpers'
import { LinkButton } from '../styles'

const SectionAbout = () => (
  <Container>
    <Image src={ImageSrc} alt="restaurant-picture" />
    <Article>
      <Title>Добро пожаловать</Title>
      <Text>
        Ресторанный комплекс &quot;Три холма&quot; находится вдали от городской суеты, на берегу Голубых озер. С летней
        веранды ресторана открывается живописный вид на одно из них. Территория украшена цветами и фонтанами.
        Имеется детская летняя площадка с горками и качелями. В ресторане доступны три зала, идеально подходящих
        для проведения досуга в спокойной обстановке. Также в отдельном здании имеются два банкетных зала для
        проведения торжеств. Общая вместимость комплекса &quot;Три холма&quot; составляет 250 персон. Посетителям
        предлагается обширное и разнообразное меню, которое состоит из блюд европейской, кавказской и
        азербайджанской кухни.
      </Text>
      <LinkButton to='/contacts' label='Подробнее о нас'/>
    </Article>
  </Container>
)

// Fix for parent calc height float elements
const Container = styled(SectionWrapper)`
  display: block;

  &:after {
    content: " ";
    display: table;
    clear: both;
  }

  @media(max-width: ${BREAKPOINTS.ts}px) {
    display: flex;
    flex-direction: column;
  }
`

const Image = styled.img`
  margin: 20px;
  border-radius: 5px;
  width: 320px;
  height: 320px;
  float: left;

  @media(max-width: ${BREAKPOINTS.tm}px) {
    width: 264px;
    height: 264px;
  }

  @media(max-width: ${BREAKPOINTS.ts}px) {
    float: none;
    margin: 0 auto;
    width: auto;
  }
`

const Article = styled.article`
  width: 100%;
  
  @media(max-width: 576px) {
    float: none;
    width: 100%;
  }
`
const Title = styled(SectionTitle)`
  margin-bottom: 20px;
  
  @media(max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 8px;
  }
`

const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
`

export default SectionAbout
