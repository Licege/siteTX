import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import {useModalMenuLogic} from './logic'
import altImg from '../../../static/img/dish.svg'

const ModalMenu = () => {
  const { dishes, categories, addDish, currentCategory, changeCurrentCategory, onHide } = useModalMenuLogic()

    return (
        <Modal show onHide={onHide}>
            <Modal.Header>
                <select id='select-category-modal' className='form-control' defaultValue={currentCategory}
                        onChange={changeCurrentCategory}>
                    <option value=''>Выберите категорию</option>
                    {categories.map(category => (
                        <option value={category.titleEn} key={category.id}>{category.title}</option>
                    ))}
                </select>
            </Modal.Header>
            <Modal.Body>
                <Table className='delivery_info-modal'>
                    <thead className='table-thread'>
                    <tr className='text-center'>
                        <th/>
                        <th>Название</th>
                        <th>Цена</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {dishes.map(dish => (
                        <tr className='text-center' key={dish.id}>
                            <td>
                                <img src={dish.imageSrc || altImg}
                                     className='delivery_info-modal-img'
                                     alt='фото'/>
                            </td>
                            <td>{dish.title}</td>
                            <td>{dish.cost} ₽</td>
                            <td><Button variant='outline-primary' onClick={addDish(dish)}>+</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
                <Button variant='primary' onClick={onHide}>Назад</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalMenu
