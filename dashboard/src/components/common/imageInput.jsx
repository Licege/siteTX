import React from 'react'


class ImageInput extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      error: !!props.error,
      value: props.value,
      type: null,
      id: props.id | 'FileInput' + Math.round(1000000 * Math.random()),
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value !== this.props.value) {
      this.setState({value: this.props.value || ''})
    }
  }

    onChange = ( event ) => {
      if (event.target && event.target.files[0]) {
        let file = event.target.files[0]
        let error = false

        let maxsize = event.target.getAttribute('maxsize'),
          minsize = event.target.getAttribute('minsize'),
          accept = event.target.getAttribute('accept')

        if (maxsize && file.size > maxsize) {
          error = 'Размер файла не должен превышать ' + maxsize / (1024 * 1024) + 'МБ'
        }
        if (minsize && file.size < minsize) {
          error = 'Размер не должен быть меньше ' + minsize + 'Байт'
        }
        if (accept && !file.type.match(accept).length) {
          error = 'Файл отклонен'
        }
        if (error) {
          this.setState({
            error: error,
            type: null,
          })
        } else {
          let url = window.URL.createObjectURL(file)
          this.setState({
            error: error,
            value: url,
            type: file.type,
          }, () => {
            this.props.onChange && this.props.onChange(file)
          })
        }
      } else {
        this.setState({error: false, value: null, type: null})
      }
    }

    clear = ( event ) => {
      event.preventDefault()
      this.setState({value: null, error: false, type: null})
    }

    refFileInput = ( fileInput ) => (this.field = fileInput)

    render() {
      let {
        className,
        options = {
          maxsize: 5 * 1024 * 1024,
          minsize: 1024,
          accept: 'image/*',
        },
        accept,
        placeholder = 'Добавить фото',
        load = false,
        allowClear = false,
        disabled = false,
        visualType = 'input',
        title,
      } = this.props

      if (accept) {
        options.accept += (',' + accept)
      }


      let {
        id,
        error,
        value,
        type,
      } = this.state

      return (
        <label className={visualType === 'button' ? ('Button' + (className ? ' ' + className : '') + (disabled ? ' -disabled' : '')) : ('FileInput' + (className ? ' ' + className : '') +
                    (error ? ' FileInput_error' : '') + (load ? ' FileInput_load' : '') + (value ? '' : ' FileInput-empty') + (disabled ? ' -disabled' : ''))}
               htmlFor={id}
               data-placeholder={placeholder}>
          {title && !load && <span>{title}</span>}
          {error && typeof error == 'string' ? <div>{error}</div> : null}

          {
                    (visualType === 'input') &&
                    (value ? (type === 'application/pdf' ? <div>пдф доделай</div> :
                    <img src={value} className='FileInput-Img' alt=''/>)
                        : <span className="Input_Preview-Dish FileInput-Img"/>)
                }
          <input ref={this.refFileInput} id={id} type="file" {...options} onChange={this.onChange}
                 className="FileInput-Field" disabled={disabled}/>

          {
                    load ? <div>Трабер</div> : null
                }

          {value && allowClear ? <span className="FileInput-Close" onClick={this.clear}/> : null}

        </label>
      )
    }
}

export default ImageInput
