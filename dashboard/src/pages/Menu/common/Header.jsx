import React from 'react'
import {Button} from 'react-bootstrap'
import {PageHeader} from '../../../styledComponents/components'


const Header = ({title, openDelModal}) => (
  <PageHeader title={title}>
    {openDelModal ? <Button variant="danger" onClick={openDelModal}>Удалить</Button> : null}
  </PageHeader>
)

export default Header