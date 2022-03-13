import React from 'react'
import {useCreateNewsLogic} from './logic'
import {PageHeader} from '../../styledComponents/components'
import NewsForm from './NewsForm'

const CreateNews = () => {
  const {uploadFile, postNews, changeDescription, cancel} = useCreateNewsLogic()

  return (
    <div>
      <PageHeader title='Добавление новости' />
      <div className='page-container'>
        <div className='card'>
          <div className='card-body'>
            <NewsForm onSubmit={postNews} uploadFile={uploadFile} changeDescription={changeDescription} cancel={cancel} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNews