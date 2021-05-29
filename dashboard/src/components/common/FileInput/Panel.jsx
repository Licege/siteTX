import React from 'react'

class Panel extends React.Component {
    render() {
        let {
            id,
            header,
            headerClassName,
            bodyClassName,
            className,
            onClick,
            children = {},
        } = this.props

        return (
            <div id={id} className={`Panel ${className || ''}`} onClick={onClick}>
                {header ? <div className={`Panel-header ${headerClassName || ''}`}>
                    {header}
                </div> : null}
                <div className={`Panel-body ${bodyClassName || ''}`}>{children}</div>
            </div>
        )
    }
}

export default Panel
