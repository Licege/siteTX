import React from 'react'
import Panel from './Panel'
import { FileShowPreview } from './FileShowPreview'
import { FileLoadModal } from './FileLoadModal'

export default class FileLoadPreview extends React.Component {
    constructor( props ) {
        super(props)
        this.state = {
            errors: [],
            openLoadModal: false,
            showSlider: false,
            filesBeforeLoad: [],
            filesUploaded: [],
            countLoading: 0,
            disableButtonLoad: true,
            activeImage: '',
        }
    }

    componentDidUpdate( prevProps, prevState, snapshot ) {
        if (prevProps.buffer && this.props.buffer && prevProps.buffer !== this.props.buffer) {
            if (this.props.fieldName === this.props.buffer.fieldName) {
                this.setState({ filesBeforeLoad: [ ...this.state.filesBeforeLoad, this.props.buffer ] })
            }
        }

        if (!prevProps.filesBeforeLoad.length && this.state.filesBeforeLoad.length) {
            this.setState({ disableButtonLoad: false })
        } else if (prevProps.filesBeforeLoad.length && !this.state.filesBeforeLoad.length) {
            this.setState({ disableButtonLoad: true })
        }

        if (prevProps.loading !== this.props.loading) {
            if (this.props.loading) {
                this.setState({ countLoading: this.state.countLoading + 1 })
            } else {
                this.setState({ countLoading: this.state.countLoading - 1 })
            }
        }
    }

    addItems = () => {
        if (!this.props.disabled) this.setState({ openLoadModal: true, filesBeforeLoad: this.state.filesUploaded })
    }

    onLoad = () => {
        this.setState(function ( state, _ ) {
            return {
                openLoadModal: false,
                filesUploaded: state.filesBeforeLoad,
            }
        }, () => {
            let fileIds = this.state.filesUploaded.map(file => file.id)
            if (this.props.handlerFiles && this.props.handlerFiles instanceof Function) {
                this.props.handlerFiles({ id: this.props.fieldName, files: fileIds })
            }
        })
    }

    onCancel = () => {
        this.setState({ openLoadModal: false, filesBeforeLoad: [] }, () => {
            this.props.onCancel && this.props.onCancel()
        })
    }

    deleteItem = ( id, type ) => {
        return ( e ) => {
            e.stopPropagation()
            switch (type) {
                case 'modal':
                    this.setState({ filesBeforeLoad: this.state.filesBeforeLoad.filter(file => file.id !== id) })
                    break
                case 'preview':
                    this.setState({ filesUploaded: this.state.filesUploaded.filter(file => file.id !== id) })
                    break
                default:
                    console.log('Тип удаления не задан!')
            }
        }
    }

    onDrop = ( acceptedFiles, rejectedFiles ) => {
        let files = [ ...this.state.filesBeforeLoad ],
            errors = [],
            forLoad = []

        for (let i = 0; i < acceptedFiles.length; i++) {
            if (this.props.maxCount && files.length >= this.props.maxCount) {
                errors.push('Максимально разрешенное количество файлов: ' + this.props.maxCount)
                break
            } else {
                forLoad.push(acceptedFiles[i])
            }
        }

        let max = this.props.maxSize || 1024 * 1024,
            min = this.props.minSize || 1024

        rejectedFiles.forEach(file => {
            if (file.size > max) {
                errors.push(`Размер файла ${file.name} превышает ${max / (1024 * 1024)} МБ, выберите другой файл`)
            } else if (file.size < min) {
                errors.push(`Размер файла ${file.name} превышает ${min / 1024} КБ, выберите другой файл`)
            }
        })

        this.setState({ errors })

        this.props.onDrop && this.props.onDrop(forLoad, rejectedFiles)
    }

    showImage = ( item ) => {
        return () => {
            this.setState({ activeImage: item.file || item.preview })
        }
    }

    showPDF = ( preview ) => {
        return ( e ) => {
            window.open(preview)
        }
    }

    hideImage = () => {
        this.setState({ activeImage: '' })
    }

    showSlider = () => {
        this.setState({ showSlider: true })
    }

    closeSlider = () => {
        this.setState({ showSlider: false })
    }

    getPreviews = () => {

    }

    render() {
        let {
            className,
            titleClassName,
            title,
            maxCount,
            maxSize,
            minSize,
            accept,
            hideTitle = false,
            disabled = false,
            tip,
        } = this.props

        let {
            filesUploaded,
            filesBeforeLoad,
            errors,
            disableButtonLoad,
            countLoading,
            activeImage,
            showSlider,
            openLoadModal,
            loadEnable,
        } = this.state

        let filesUploadedCount = filesUploaded.length

        return (
            <Panel className={`FileLoad ${filesUploaded ? '' : '-empty'}`}>
                {disabled || filesUploadedCount
                    ? <FileShowPreview files={filesUploaded}
                                       title={title}
                                       maxCount={maxCount}
                                       className={className}
                                       showSlider={showSlider}
                                       showLoadModal={openLoadModal}
                                       onRemove={this.deleteItem}/>
                    : null}
                <div className='FileLoad-Buttons' title={title}>
                    <span className={`FileLoad-Title ${titleClassName || ''}`}>
                        {!hideTitle ? <span className='FileLoad-Title-Short' title={title}>
                            {title && title.length > 21 ? title.substr(0, 21) + '...' : title}
                        </span> : null}
                    </span>
                    {!disabled && !filesUploadedCount
                        ? <>
                            <span className='FileLoad-LoadMore' onClick={this.addItems}/>
                            <span className='FileLoad-Delete' onClick={this.deleteItem}/>
                        </> : null}
                </div>
                {openLoadModal ? <FileLoadModal title={title}
                                                maxCount={maxCount}
                                                maxSize={maxSize}
                                                minSize={minSize}
                                                accept={accept}
                                                files={filesBeforeLoad}
                                                disableButtonLoad={disableButtonLoad}
                                                loadEnable={loadEnable}
                                                errors={errors}
                                                activeImage={activeImage}
                                                tip={tip}
                                                countLoading={countLoading}
                                                onRemove={this.deleteItem}
                                                onDrop={this.onDrop}
                                                onLoad={this.onLoad}
                                                onCancel={this.onCancel}
                                                showImage={this.showImage}
                                                hideImage={this.hideImage}
                                                showPDF={this.showPDF}
                /> : null}
            </Panel>
        )
    }
}
