import React from 'react'
import Slider from '../Slider'
import Panel from './Panel'

const formSlidesAndPreviews = ( files ) => {
  let slides = [],
    previews = []

  files.forEach(( item, key ) => {
    slides.push(<img key={key} className='ImageSlider-Body-Img' src={item.file || item.preview} alt=''/>)
    previews.push(<img key={key} className='ImageSlider-Body-Img' src={item.file || item.preview} alt=''/>)
  })

  return {slides, previews}
}


const getPreviews = ( files, title, maxCount, showSlider, showLoadModal, onRemove ) => {
  return <div className={`Dropzone-Previews Dropzone-Previews-${files}`}>
    {files.map(( item, key ) => (
      <div key={key} className={`FileLoad-PreviewImg ${title ? '' : '-no-title'}`}
           onClick={maxCount === 1 ? showSlider : showLoadModal}>
        <img className='FileLoad-Image' src={item.file || item.preview} alt=''/>
        {onRemove && typeof onRemove === 'function' ?
          <span className='FileLoad-Preview-Close' onClick={onRemove(item.id, 'preview')}/> : null}
      </div>
            ),
        )}
  </div>
}

export const FileShowPreview = ( props ) => {
  let {files, title, className, maxCount = 1, showSlider, showLoadModal, onRemove} = props

  let filesCount = files && files.length
  let {slides, previews} = formSlidesAndPreviews(files)

  return (
    <Panel className={`FileLoad ${className || ''}`}>
      {filesCount ? getPreviews(files, title, maxCount, showSlider, showLoadModal, onRemove) : null}
      {title ? <div className='FileLoad-Buttons'>
        <span className='FileLoad-Title' title={title}>
          {title.length > 30 ? title.substr(0, 30) + '...' : title}
        </span>
      </div> : null}
      {showSlider ? <div>Сделай модалку
        <Slider slides={slides} previews={previews}/>
      </div> : null}
    </Panel>
  )
}
