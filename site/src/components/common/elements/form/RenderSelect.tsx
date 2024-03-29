import React from 'react'
import Select from 'react-select'

import './style.scss'

type OptionType = {
    label: string
    value: string | number
}

const getInitialValue = ({ defaultValue, options, input }: any) => {
  if (defaultValue) return defaultValue

  if (options.length && input) return options.find((option: any) => option.value === input.value)

  return undefined
}

class renderSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      innerValue: getInitialValue(props)
    }
  }

    setValueHandler = (chosenOption: OptionType) => {
      this.setState({ innerValue: chosenOption })
      this.props.input.onChange(chosenOption.value)
    }

    render() {
      const {
        defaultValue,
        className,
        label,
        input: { name },
        isDisabled,
        isLoading,
        isClearable,
        isRtl,
        isSearchable,
        placeholder,
        options,
        ...custom
      } = this.props

      const { innerValue } = this.state

      return (
        <div className={`field${  className ? ` ${className}` : ''}`}>
          {label ? <label className='field__label' htmlFor={name}>{label}</label> : null}
          <Select value={innerValue}
                  onChange={this.setValueHandler}
                  id={name}
                  defaultValue={defaultValue}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  placeholder={placeholder}
                  options={options}
                  {...custom} />
        </div>
      )
    }
}

export default renderSelect
