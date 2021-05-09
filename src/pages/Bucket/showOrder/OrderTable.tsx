import React from 'react'
import styled from 'styled-components'
import { getDishesKey } from '../../../plugins/helpers'
import altImg from '../../../static/img/dish.svg'
import { useBucketOrderTableLogic } from './logic'

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
                     value={getDishesKey(order, dish.id, 'count')}
              />
              <Add onClick={() => increaseDishCount(dish)} />
            </CountBlock>
            <Ceil>
              {getDishesKey(order, dish.id, 'cost') * getDishesKey(order, dish.id, 'count') + ' ₽'}
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

const Subtract = styled.span`
  padding: 0 8px;
  position: relative;
  display: inline-block;
  height: 30px;
  width: 30px;
  cursor: pointer;
  opacity: 0.75;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 15px;
    height: 3px;
    background-color: ${props => props.theme.colors.brown.brand};
    transition: 0.5s;
  }

  &:hover {
    opacity: 1;
  }
`

const Add = styled.span`
  padding: 0 8px;
  position: relative;
  display: inline-block;
  height: 30px;
  width: 30px;
  cursor: pointer;
  opacity: 0.75;

  &:before, &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 15px;
    height: 3px;
    background-color: ${props => props.theme.colors.brown.brand};
    transition: 0.5s;
    content: '';
  }

  &:after {
    transform: rotate(90deg);
  }

  &:hover {
    opacity: 1;
  }
`

const Close = styled.div`
  margin: 0 16px;
  padding: 0 8px;
  position: relative;
  display: inline-block;
  height: 30px;
  width: 30px;
  cursor: pointer;
  opacity: 0.75;

  &:before, &:after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 15px;
    height: 3px;
    background-color: ${props => props.theme.colors.brown.brand};
    transition: 0.5s;
    content: '';
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  &:hover {
    opacity: 1;
  }
`

const Ceil = styled.div`
  width: 20%;
  text-align: center;
  white-space: nowrap;
`

export default OrderTable