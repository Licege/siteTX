import React from 'react'
import {dishType} from "../../../../types/types";
import {Dialog, DialogContent} from "@material-ui/core";
import {fullLink} from "../../../../plugins/helpers";
import Button from "@material-ui/core/Button";

interface IProps {
    dish: dishType
    open: boolean

    addToBucket: (dish: dishType) => void
    onClose: () => void
}

const ModalDish: React.FC<IProps> = ({dish, addToBucket, open, onClose}) => {
    return (
        <Dialog open={open} onClose={onClose} className='modal-dish'>
            <DialogContent>
                <div className='modal-dish__wrapper'>
                    <div className='modal-dish__close' onClick={onClose} />
                    <img className='modal-dish__img' src={fullLink(dish.imageSrc)} alt='' />
                    <div className='modal-dish__info'>
                        <div className='modal-dish__title'>{dish.title}</div>
                        <div className='modal-dish__description'>{dish.description}</div>
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

                        <div className='modal-dish__button'>
                            <Button variant='contained' color='primary' onClick={() => addToBucket(dish)}>
                                Заказать
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ModalDish