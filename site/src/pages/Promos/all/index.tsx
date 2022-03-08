import React from 'react'
import { Helmet } from 'react-helmet';
import CardPromo from '../../../components/Cards/CardPromo'
import EmptyPage from '../../EmpyPage'
import { Container, Title, Wrapper } from './styles'
import { usePromosPageLogic } from './logic'


const Promos: React.FC = () => {
  const { promos } = usePromosPageLogic()

  if (!promos.length) return <EmptyPage />

  return (
    <Container>
      <Helmet title='Акции' />
      <Title>~ Акции ~</Title>
      <Wrapper>
        {promos.map((promo: any) => <CardPromo promo={promo} key={promo.id} />)}
      </Wrapper>
    </Container>
  )
}

export default Promos
