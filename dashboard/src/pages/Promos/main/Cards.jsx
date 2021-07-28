import React from 'react'
import {usePromosCardsLogic} from '../logic'
import {CardPromo} from '../../../components/common/element/CardPromo'

const PromosCards = () => {
  const { promos, onDelete } = usePromosCardsLogic()

  if (!promos.length) return <div/>

  return promos.map(promo => <CardPromo promo={promo} onDelete={onDelete} key={promo.id}/>)
}

export default PromosCards