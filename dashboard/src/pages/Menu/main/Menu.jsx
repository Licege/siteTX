import React from 'react'
import { useMenuLogic } from '../logic'
import Cards from './Cards'
import { PageHeader } from '../../../styledComponents/components'

const Menu = () => {
  const { redirectToCreateDish, onUploadPDFMenu } = useMenuLogic()

  return (
        <div>
            <PageHeader title='Меню'>
                <button className='btn btn-primary' onClick={redirectToCreateDish}>Добавить блюдо</button>
            </PageHeader>
            <div className='page-container'>
                <div className='card mb-4'>
                    <div className='card-body'>
                        <h4>PDF-меню:</h4>
                        <input type='file' accept="application/pdf" onChange={onUploadPDFMenu} />
                    </div>
                </div>

                <div className='card'>
                    <h4 className='menu-header'>~ Блюда ~</h4>
                    <div className='card-body menu-content'>
                        <Cards />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
