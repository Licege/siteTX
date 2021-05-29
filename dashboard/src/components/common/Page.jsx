import React from 'react'
import { Button } from 'react-bootstrap'

export const Page = ( { title, buttonTitle, onButtonClick, children } ) => (
    <div className='page'>
        <div className={'page-header' + (onButtonClick ? ' -action' : '')}>
            <div className='page-header-title'>{title}</div>
            {onButtonClick ? <div className='page-header-action'>
                <Button variant='primary' onClick={onButtonClick}>{buttonTitle}</Button>
            </div> : null}
        </div>
        <div className='page-container'>
            {children}
        </div>
    </div>
)
