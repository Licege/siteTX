import React from 'react'
import {Button, Modal} from 'react-bootstrap'

export const ConfirmModal = ({user, show, onConfirm, cancel}) => (
  <Modal show={show} onHide={cancel}>
    <Modal.Header closeButton>
      <Modal.Title>Вы действительно хотите назначить {user && user.email} администратором?</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button onClick={onConfirm}>Назначить</Button>
      <Button variant='secondary' onClick={cancel}>Отменить</Button>
    </Modal.Footer>
  </Modal>
)

