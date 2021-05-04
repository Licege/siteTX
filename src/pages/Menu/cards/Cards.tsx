import React from 'react'
import { useMenuCardsLogic } from '../logic'
import CardDish from '../../../components/Cards/CardDish/CardDishSC'
import { Grid, makeStyles } from '@material-ui/core'

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center'
    }
  }
}))

const Cards = (): JSX.Element => {
  const { dishes } = useMenuCardsLogic()
  const gridStyles = useGridStyles()

  return (
    <Grid classes={gridStyles} container spacing={4}>
      {dishes.map(dish => (
          <CardDish dish={dish} key={dish.id} />
      ))}
    </Grid>
  )
}

// const Cards = (): JSX.Element => {
//   const { dishes } = useMenuCardsLogic()
//
//   return (
//     <div className='menu-wrapper-content'>
//       {dishes.map(dish => <CardDish dish={dish} key={dish.id} />)}
//     </div>
//   )
// }

export default Cards