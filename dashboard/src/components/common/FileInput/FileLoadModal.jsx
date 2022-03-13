import React from 'react'
import Panel from './Panel'
import Modal from 'react-bootstrap/Modal'
import Dropzone from '../Dropzone'
import Button from 'react-bootstrap/Button'

const getPreviews = ( files, countLoading, onRemove, showImage, showPDF ) => (
  <div className='Dropzone-Previews'>
    {files.map(( item, key ) => {
                let preview = item.type && item.type.includes('image')
                return preview ?
                  <div key={key} className={`FileLoad-PreviewImg ${item.rejected ? '-error' : ''}`}
                       onClick={showImage(item)}>
                    <img className='FileLoad-Preview-Image' src={item.preview} alt=''/>
                    <span className='FileLoad-Preview-Close' onClick={onRemove(item.id, 'modal')}/>
                  </div>
                    :
                  <div key={key} className={`FileLoad-PreviewDoc ${item.rejected ? '-error' : ''}`}
                       onClick={showPDF(item.preview)}>
                    <span className='FileLoad-Preview-Close' onClick={onRemove(item.id, 'modal')}/>
                  </div>
            },
        )}

    {countLoading > 0 ? Array(countLoading).fill(1).map((_, index) => (
      <div key={index} className='FileLoad-PreviewImg'>
        <div className='FileLoad-Preview-Throuber'>Сделай трабер</div>
      </div>
            ),
        ) : null}

  </div>
)

export const FileLoadModal = ( props ) => {
  let {
    title,
    maxCount = 1,
    maxSize = 1024 * 1024,
    minSize = 1024,
    accept = '.jpg,.jpeg,.png,.doc,.docx,.pdf',
    tip,
    onDrop,
    onCancel,
    onLoad,
    onRemove,
    showImage,
    showPDF,
    files,
    loadEnable,
    disableButtonLoad,
    errors,
    countLoading,
    activeImage,
  } = props

  let filesCount = files.length
  let dropzoneRef

  return (
    <Modal>
      <div className='DropzoneModal-Header'>
        <h5>{title}</h5>
        {tip && <p className='DropzoneModal-Header-Tip'>{tip}</p>}
      </div>
      <Panel className={`mt-20 mr-20 ml-20 mb-10 ${filesCount > maxCount ? 'Dropzone -error' : ''} ${filesCount < maxCount ? 'Dropzone -active' : ''}`}>
        <Dropzone dropzoneRef={( el ) => {
                    dropzoneRef = el
                }}
                  className={`Dropzone_size_md ${filesCount ? '' : 'FlexBox_center'}`}
                  onDrop={onDrop}
                  maxSize={maxSize}
                  minSize={minSize}
                  accept={accept} multiple={maxCount > 1}
                  disabled={filesCount >= maxCount}>
          {filesCount || countLoading > 0
                        ? getPreviews(files, countLoading, onRemove, showImage, showPDF) : null}
          {filesCount < 1 || countLoading === 0
                        ? <div className='Dropzone-TextPreview text-center'>
                          <div className='Text_large mb-10'>
                            <div>Перетащите сюда файл{maxCount > 1 ? 'ы' : ''}</div>
                            <div>или</div>
                          </div>
                          <Button variant='outline-primary' onClick={() => dropzoneRef.open()}>
                            Выберите файл{maxCount > 1 ? 'ы' : ''}
                          </Button>
                          {errors.length ? errors.map(( error, key ) => <div key={key}
                                                                             className='Text_danger font-italic mt-10'>
                            {error}
                          </div>) : null}
                        </div>
                        : <div className='text-center'>
                          {errors.length ? errors.map(( error, key ) => <div key={key}
                                                                             className='Text_danger font-italic mt-10'>
                            {error}
                          </div>) : null}
                        </div>}
        </Dropzone>
      </Panel>
      <div className='pl-20 pr-20'>
        <div className='row d-flex justify-content-end align-items-end'>
          <div className='col-sm-6 pb-20 text-left d-flex'>
            Размер файла не должен превышать{maxSize / (1024 * 1024)} МБ
          </div>
          <div className='col-sm-6 pb-20 d-flex'>
            <Button variant='outline-warning' onClick={onCancel}>Отменить</Button>
            <Button variant='primary' disabled={!loadEnable && disableButtonLoad}
                    onClick={loadEnable && !disableButtonLoad ? onLoad : null}>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
      {activeImage && <Modal>
        <div className='ImageSlider'>
          <div className='ImageSlider-Body'>
            <div className='ImageSlider-Body-Item ImageSlider-PreviewsList-Item-Item_active'>
              <img className='ImageSlider-Body-Img' src={activeImage} alt=''/>
            </div>
          </div>
        </div>
        </Modal>}
    </Modal>
  )
}
