import React from 'react'
import {useNewsCardsLogic} from '../logic'
import CardNews from '../../../components/common/element/CardNews'

const Cards = () => {
  const { news, deleteNews, redirectToEditNews } = useNewsCardsLogic()

  return news.map(n =>
    <CardNews news={n} deleteNews={deleteNews} detail={redirectToEditNews} key={n.id}/>,
  )
}

export default Cards