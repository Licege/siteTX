import React from 'react'
import { dishType } from '../../../types/types'
import { Dialog, DialogContent } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import useModalDishInfoLogic from './logic'

interface IProps {
  dish: dishType
}

const ModalDishInfo: React.FC<IProps> = ({ dish }) => {
  const { addDishToBucket, hideModal } = useModalDishInfoLogic()

  return (
    <Dialog open onClose={hideModal} className='modal-dish'>
      <DialogContent>
        <div className='modal-dish__wrapper'>
          <div className='modal-dish__close' onClick={hideModal}/>
          <img className='modal-dish__img' src={dish.imageSrc} alt=''/>
          <div className='modal-dish__info'>
            <div className='modal-dish__title'>{dish.title}</div>
            {dish.description ? <div className='modal-dish__description'>{dish.description}</div> : null}
            <div className='modal-dish__energy'>
              <div className='modal-dish__energy-title'>Энергетическая ценность</div>
              <div className='modal-dish__energy-description'>
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
                    <td>Каллорийность</td>
                    <td>*** Ккал</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-dish__worth">
              <div className='modal-dish__worth-price'>{dish.cost} р</div>
              <div className='modal-dish__worth-weight'>{dish.weight} грамм</div>
            </div>

            {dish.isDelivery
              ? <div className='modal-dish__button'>
                <Button variant='contained' color='primary' onClick={() => addDishToBucket(dish)}>
                  Заказать
                </Button>
              </div>
              : <div className='modal-dish__no_delivery'>
                Доступно только в ресторане
              </div>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ModalDishInfo
