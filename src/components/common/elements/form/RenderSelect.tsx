import React from 'react'
import Select from 'react-select'

import './style.scss'

type OptionType = {
    label: string
    value: string|number
}

interface IProps {
    defaultValue?: OptionType
    isDisabled?: boolean
    isLoading?: boolean
    isClearable?: boolean
    isRtl?: boolean
    isSearchable?: boolean
    className?: string
    placeholder?: string
    options: OptionType[]
}

const renderSelect: React.FC<any> = ({
                                               options,
                                               defaultValue,
                                               input: { name },
                                               isDisabled = false,
                                               isLoading = false,
                                               isClearable = false,
                                               isRtl = false,
                                               isSearchable = false,
                                               label = '',
                                               className = '',
                                               placeholder = '',
                                               ...custom
                                           }) => (
    <div className={'field' + (className ? ` ${className}` : '')}>
        {label ? <label className='field__label' htmlFor={name}>{label}</label> : null}
        <Select
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

export default renderSelect
