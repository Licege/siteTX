import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

interface IProps {
    to: string
    label: String
    className?: String
    variant?: 'text' | 'contained'
    color?: 'default' | 'inherit' | 'primary' | 'secondary'
}

const LinkButton: React.FC<IProps> = ({ to, label, className, variant, color }) => (
    <div className={className ? `Link-Button ${className}` : 'Link-Button'}>
        <Link to={to}>
            <Button variant={variant ? variant : 'outlined'} color={color}>
                {label}
            </Button>
        </Link>
    </div>
)

export default LinkButton
