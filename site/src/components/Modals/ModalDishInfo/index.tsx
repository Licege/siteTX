import React from 'react'
import { DialogContent } from '@material-ui/core'
import { dishType } from '../../../types/types'
import useModalDishInfoLogic from './logic'
import {
  Close,
  Container,
  Description,
  Energy,
  EnergyDescription,
  EnergyTitle,
  Image,
  InfoBlock,
  NoDelivery,
  OrderButton,
  Price,
  Title,
  Weight,
  Worth,
  Wrapper
} from './styles'
import { Button } from '../../core'

interface IProps {
  dish: dishType
}

const ModalDishInfo: React.FC<IProps> = ({ dish }) => {
  const { addDishToBucket, hideModal } = useModalDishInfoLogic()

  return (
    <Container open onClose={hideModal}>
      <DialogContent>
        <Wrapper>
          <Close onClick={hideModal} />
          <Image src={dish.imageSrc} alt=''/>
          <InfoBlock>
            <Title>{dish.title}</Title>
            {dish.description ? <Description>{dish.description}</Description> : null}
            <Energy>
              <EnergyTitle>Энергетическая ценность</EnergyTitle>
              <EnergyDescription>
                <table>
                  <tbody>
                    <tr>
                      <td>Белки</td>
                      <td>** г</td>
                    </tr>
                    <tr>
                      <td>Жиры</td>
                      <td>** г</td>
                    </tr>
                    <tr>
                      <td>Углеводы</td>
                      <td>** г</td>
                    </tr>
                    <tr>
                      <td>Калорийность</td>
                      <td>*** Ккал</td>
                    </tr>
                  </tbody>
                </table>
              </EnergyDescription>
            </Energy>
            <Worth>
              <Price>{dish.cost} р</Price>
              <Weight>{dish.weight} грамм</Weight>
            </Worth>

            {dish.isDelivery
              ? <OrderButton>
                <Button variant='contained' color='primary' onClick={() => addDishToBucket(dish)}>
                  Заказать
                </Button>
              </OrderButton>
              : <NoDelivery>
                Доступно только в ресторане
              </NoDelivery>
            }
          </InfoBlock>
        </Wrapper>
      </DialogContent>
    </Container>
  )
}

export default ModalDishInfo
