import React from 'react'
import {usePromosCardsLogic} from '../logic'
import {CardPromo} from '../../../components/common/element/CardPromo'

const PromosCards = () => {
  const { promos } = usePromosCardsLogic()

  if (!promos.length) return <div/>

  return promos.map(promo => <CardPromo promo={promo} key={promo.id}/>)
}

export default PromosCards