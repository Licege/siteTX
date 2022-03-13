import React from 'react'
import DropZoneElement from 'react-dropzone'

export default class Dropzone extends React.Component {
    onDrag = () => {
      // курсор двигается при перетаскивании.
    }

    onDragOver = () => {
      // курсор мыши наведен на элемент при перетаскивании
      this.props.onDragOver && this.props.onDragOver()
    }

    onDragLeave = () => {
      // курсор мыши покидает пределы перетаскиваемого элемента
      this.props.onDragLeave && this.props.onDragLeave()
    }

    onDragEnd = () => {
      // пользователь отпускает курсор мыши в процессе перетаскивания.
      this.props.onDragEnd && this.props.onDragEnd()
    }

    onDrop = ( acceptedFiles, rejectedFiles ) => {
      // происходит drop элемента
      this.props.onDrop && this.props.onDrop(acceptedFiles, rejectedFiles)
    }

    render() {
      let {
        dropzoneRef,
        className,
        disableClick,
        minSize = 1,
        maxSize = 10 * 1024 * 1024,
        accept,
        disabled,
        multiple,
      } = this.props

      return <DropZoneElement ref={dropzoneRef}
                              disableClick={disableClick}
                              minSize={minSize}
                              maxSize={maxSize}
                              accept={accept}
                              multiple={multiple}
                              disabled={disabled}
                              className={'Dropzone' + (className ? ` ${className}` : '')}
                              activeClassName=''
                              onDrag={this.onDrag}
                              onDragOver={this.onDragOver}
                              onDragLeave={this.onDragLeave}
                              onDragEnd={this.onDragEnd}
                              onDrop={this.onDrop}>
        {this.props.children}
      </DropZoneElement>
    }
}
