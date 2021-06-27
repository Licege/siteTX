import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { useMenuCardsLogic } from '../logic'
import CardDish from '../../../components/Cards/CardDish/CardDishSC'

const useGridStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center'
  }
}))

const Cards = (): JSX.Element => {
  const { dishes } = useMenuCardsLogic()
  const gridStyles = useGridStyles()

  return (
    <Grid classes={gridStyles} container spacing={4}>
      {dishes.map(dish => <CardDish dish={dish} key={dish.id} />)}
    </Grid>
  )
}

export default Cards