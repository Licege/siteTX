import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { hideModal } from '../../redux/reducers/modals.reducer'


const ModalDelete = ({ title, onRemove, onCancel = () => {} }) => {
  const dispatch = useDispatch()

  const onHide = () => dispatch(hideModal())
  const onSubmit = () => {
    onRemove()
    onHide()
  }
  const onCancelHandle = () => {
    onCancel()
    onHide()
  }

  return (
    <Modal show onHide={onCancelHandle}>
      <Modal.Header closeButton>
        <Modal.Title>Вы действительно хотите удалить {title}?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={onSubmit}>
          Удалить
        </Button>
        <Button variant="secondary" onClick={onCancelHandle}>
          Отменить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default ModalDelete
