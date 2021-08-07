import React from 'react'
import { Button } from '../../../components/core'
import { Container, Content, Wrapper, Title, Image, ActionsBlock } from './styles'
import { usePromoPageLogic } from './logic'

const Promo: React.FC = () => {
  const { promo, redirectToPromos } = usePromoPageLogic()

  const { title, description, imageSrc } = promo

  return (
    <Container>
      <Image src={imageSrc} />
      <Wrapper>
        <Content>
          <Title>{title}</Title>
          <div dangerouslySetInnerHTML={{ __html: description }} />
          <ActionsBlock>
            <Button variant="outlined" onClick={redirectToPromos}>Все акции</Button>
          </ActionsBlock>
        </Content>
      </Wrapper>
    </Container>
  )
}

export default Promo
