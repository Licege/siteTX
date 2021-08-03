import React from 'react'
import { useMenuLogic } from '../logic'
import Cards from './Cards'
import { PageHeader } from '../../../styledComponents/components'
import Gallery from "../../../components/UI/Gallery";

export const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 100,
    height: 100
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 100,
    height: 100
  }
];


const Menu = () => {
  const { redirectToCreateDish, onUploadPDFMenu } = useMenuLogic()

  return (
        <div>
            <PageHeader title='Меню'>
                <button className='btn btn-primary' onClick={redirectToCreateDish}>Добавить блюдо</button>
            </PageHeader>
            <div className='page-container'>
              <div>
                <Gallery photos={photos} />
              </div>
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
