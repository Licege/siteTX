import React from 'react'
import styled from 'styled-components'
import { getDishesKey } from '../../../plugins/helpers'
import altImg from '../../../static/img/dish.svg'
import { useBucketOrderTableLogic } from './logic'
import { Close, Plus, Subtract } from '../../../styledComponents/atoms'

const OrderTable = () => {
  const { dishes, order, increaseDishCount, reduceDishCount, changeDishCount, removeDish } = useBucketOrderTableLogic()

  return (
    <TableContainer>
      {dishes.map(dish => (
        <Row key={dish.id}>
          <Image src={dish.imageSrc || altImg} alt='' />
          <RowInfo>
            <DishTitle>{dish.title}</DishTitle>
            <CountBlock>
              <Subtract onClick={() => reduceDishCount(dish)} />
              <input onChange={changeDishCount(dish)}
                     inputMode="numeric"
                     value={getDishesKey(order, dish.id, 'count')} />
              <Plus onClick={() => increaseDishCount(dish)} />
            </CountBlock>
            <Ceil>
              {`${getDishesKey(order, dish.id, 'cost') * getDishesKey(order, dish.id, 'count')  } ₽`}
            </Ceil>
          </RowInfo>
          <Close onClick={() => removeDish(dish.id)} />
        </Row>
      ))}
    </TableContainer>
  )
}

const TableContainer = styled.div`
  max-height: 350px;
  overflow-y: auto;
  padding: 0 12px;
  margin-bottom: 12px;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`

const Image = styled.img`
  width: 120px;
  margin-right: 16px;
  border-radius: 5px;
`

const RowInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 120px);
  padding-bottom: 8px;
  border-bottom: 1px solid ${props => props.theme.colors.brown.brand};
`

const DishTitle = styled.div`
  width: 40%;
`

const CountBlock = styled.div`
  display: flex;
  max-height: 30px;
  max-width: 90px;

  input {
    width: 30px;
    border-radius: 50%;
    border-color: ${props => props.theme.colors.brown.brand};
    border-style: solid;
    text-align: center;
    outline: none;
  }
`

const Ceil = styled.div`
  width: 20%;
  text-align: center;
  white-space: nowrap;
`

export default OrderTable