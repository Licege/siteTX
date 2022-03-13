import React from 'react'
import {useEditNewsLogic} from './logic'
import NewsForm from './NewsForm'
import Preloader from '../../components/common/Preloader/Preloader'
import {PageHeader} from '../../styledComponents/components'

const EditNews = () => {
  const {currentNews, updateNews, isLoading, uploadFile, changeDescription, cancel} = useEditNewsLogic()

  if (isLoading) return <Preloader />

  if (!currentNews) return <div />

  return (
    <div>
      <PageHeader title={currentNews.title} />
      <div className='page-container'>
        <div className='card'>
          <div className='card-body'>
            <NewsForm onSubmit={updateNews} initialValues={currentNews} news={currentNews} changeDescription={changeDescription} uploadFile={uploadFile} cancel={cancel} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditNews